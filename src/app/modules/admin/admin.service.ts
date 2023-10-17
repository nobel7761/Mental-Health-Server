/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma, Role } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AdminSearchableFields } from './admin.constants';
import { IAdminFilterRequest } from './admin.interfaces';

const createAdmin = async (data: Admin): Promise<Admin> => {
  const isEmailExistsInPatient = await prisma.patient.findFirst({
    where: {
      email: data.email,
    },
  });

  const isEmailExistsInSpecialist = await prisma.specialist.findFirst({
    where: {
      email: data.email,
    },
  });

  if (isEmailExistsInPatient || isEmailExistsInSpecialist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Email Found!');
  }

  const isPhoneNumberExistsInPatient = await prisma.patient.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  const isPhoneNumberExistsInSpecialist = await prisma.specialist.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Phone Number Found!');
  }

  if (data.role === Role.SUPER_ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, "You Can't Do This!");
  } else {
    const result = await prisma.admin.create({
      data,
    });

    return result;
  }
};

const getAllAdmin = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

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

  const admins = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const result = admins.filter(admin => admin.role !== Role.SUPER_ADMIN);

  const total = result.length;
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

  if (result.role === Role.SUPER_ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden to Access!');
  }

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
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin Does Not Exists!');
  }

  if (payload.email) {
    const isEmailExistsInPatient = await prisma.patient.findUnique({
      where: {
        email: payload.email,
      },
    });

    const isEmailExistsInSpecialist = await prisma.specialist.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (isEmailExistsInPatient || isEmailExistsInSpecialist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User Exists With This Email!'
      );
    }
  }

  if (payload.phone_number) {
    const isPhoneNumberExistsInPatient = await prisma.patient.findUnique({
      where: {
        phone_number: payload.phone_number,
      },
    });

    const isPhoneNumberExistsInSpecialist = await prisma.specialist.findUnique({
      where: {
        phone_number: payload.phone_number,
      },
    });

    if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
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
  updateAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteSingleAdmin,
};
