/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AdminSearchableFields } from './admin.constants';
import { IAdminFilterRequest } from './admin.interfaces';

const createAdmin = async (data: Admin): Promise<Admin> => {
  const isEmailExistsInUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const isEmailExistsInAdmin = await prisma.admin.findFirst({
    where: {
      email: data.email,
    },
  });

  if (isEmailExistsInUser || isEmailExistsInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Email Found!');
  }

  const isPhoneNumberExistsInUser = await prisma.user.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  const isPhoneNumberExistsInAdmin = await prisma.admin.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  if (isPhoneNumberExistsInUser || isPhoneNumberExistsInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Phone Number Found!');
  }

  const result = await prisma.admin.create({
    data,
  });

  return result;
};

const getMyProfile = async (authUserId: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: authUserId,
    },
  });

  return result;
};

const updateMyProfile = async (
  authUserId: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  const isExists = await prisma.admin.findUnique({
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

  const result = await prisma.admin.update({
    where: {
      id: authUserId,
    },
    data: payload,
  });

  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  const isExists = await prisma.admin.findUnique({
    where: {
      id,
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

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllAdmin = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  console.log(searchTerm);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AdminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.admin.count();
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin Doesn't Exists");
  }

  return result;
};

const deleteSingleAdmin = async (id: string): Promise<Admin | null> => {
  const isExists = await prisma.admin.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin Doesn't Exists");
  }

  const result = await prisma.admin.delete({
    where: { id },
  });

  return result;
};

export const AdminService = {
  createAdmin,
  getMyProfile,
  updateMyProfile,
  updateAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteSingleAdmin,
};
