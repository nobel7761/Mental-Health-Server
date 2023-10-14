/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Role, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { UserSearchableFields } from './user.constants';
import { IUserFilterRequest } from './user.interfaces';

const createUser = async (data: User): Promise<User | undefined> => {
  const isEmailExists = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (isEmailExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Email Found!');
  }

  const isPhoneNumberExists = await prisma.user.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  if (isPhoneNumberExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Phone Number Found!');
  }

  const result = await prisma.user.create({
    data,
  });

  return result;
};

const getMyProfile = async (authUserId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: authUserId,
    },
  });

  return result;
};

const updateMyProfile = async (
  authUserId: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExists = await prisma.user.findUnique({
    where: {
      id: authUserId,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile Not Found!');
  }

  if (payload.email) {
    const findDuplicateEmail = await prisma.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (findDuplicateEmail) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User Exists With This Email!'
      );
    }
  }

  if (payload.phone_number) {
    const findDuplicatePhoneNumber = await prisma.user.findUnique({
      where: {
        phone_number: payload?.phone_number,
      },
    });

    if (findDuplicatePhoneNumber) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User Exists With This Phone Number!'
      );
    }
  }

  const result = await prisma.user.update({
    where: {
      id: authUserId,
    },
    data: payload,
  });

  return result;
};

const getAllUser = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
  authUserId?: string
): Promise<IGenericResponse<User[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: UserSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === 'USER_MANAGEMENT') {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'user'.
        andConditions.push({
          role: Role.user,
        });
      }
      if (authUser.department === 'DOCTORS_MANAGEMENT') {
        andConditions.push({
          role: Role.doctor,
        });
      }
      if (authUser.department === 'PSYCHOLOGIST_MANAGEMENT') {
        andConditions.push({
          role: Role.psychologist,
        });
      }
    }
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getSingleUser = async (
  id: string,
  authUserId?: string
): Promise<User | null> => {
  const isExists = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exist");
  }

  const whereConditions: Prisma.UserWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === 'USER_MANAGEMENT') {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'user'.
        whereConditions.role = 'user';
      } else if (authUser.department === 'DOCTORS_MANAGEMENT') {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'doctor'.
        whereConditions.role = 'doctor';
      } else if (authUser.department === 'PSYCHOLOGIST_MANAGEMENT') {
        // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'psychologist'.
        whereConditions.role = 'psychologist';
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to access'
        );
      }
    }
  }

  const result = await prisma.user.findUnique({
    where: whereConditions,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to access'
    );
  }

  return result;
};

const updateSingleUser = async (
  id: string,
  dataToUpdate: Partial<User>, // Data to update (e.g., { name: 'New Name' })
  authUserId?: string
): Promise<User | null> => {
  const isExists = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exist");
  }

  const whereConditions: Prisma.UserWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === 'USER_MANAGEMENT') {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // allow updating only for users with the role 'user'.
        whereConditions.role = 'user';
      } else if (authUser.department === 'DOCTORS_MANAGEMENT') {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // allow updating only for users with the role 'doctor'.
        whereConditions.role = 'doctor';
      } else if (authUser.department === 'PSYCHOLOGIST_MANAGEMENT') {
        // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
        // allow updating only for users with the role 'psychologist'.
        whereConditions.role = 'psychologist';
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to update this user'
        );
      }
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: whereConditions,
  });

  if (!existingUser) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to access'
    );
  }

  // Perform the update using Prisma.
  const updatedUser = await prisma.user.update({
    where: whereConditions,
    data: dataToUpdate,
  });

  return updatedUser;
};

const deleteSingleUser = async (
  id: string,
  authUserId?: string
): Promise<User | null> => {
  const isExists = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const whereConditions: Prisma.UserWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === 'USER_MANAGEMENT') {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // allow deleting only users with the role 'user'.
        whereConditions.role = 'user';
      } else if (authUser.department === 'DOCTORS_MANAGEMENT') {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // allow deleting only users with the role 'doctor'.
        whereConditions.role = 'doctor';
      } else if (authUser.department === 'PSYCHOLOGIST_MANAGEMENT') {
        // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
        // allow deleting only users with the role 'psychologist'.
        whereConditions.role = 'psychologist';
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to delete this user'
        );
      }
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: whereConditions,
  });

  if (!existingUser) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this user'
    );
  }

  // Perform the deletion using Prisma.
  const result = await prisma.user.delete({
    where: whereConditions,
  });

  return result;
};

export const UserService = {
  createUser,
  getMyProfile,
  updateMyProfile,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
