/* eslint-disable @typescript-eslint/no-explicit-any */
import { Department, Prisma, Role, Specialist } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { SpecialistSearchableFields } from './specialist.constants';
import { ISpecialistFilterRequest } from './specialist.interfaces';
import { generateSpecialistSlots } from './specialist.utils';

const createSpecialistDoctor = async (
  authUserId: string,
  payload: Specialist
): Promise<Specialist> => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const isEmailExistInSpecialist = await prisma.patient.findFirst({
    where: {
      email: payload.email,
    },
  });

  const isEmailExistInAdmin = await prisma.admin.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExistInSpecialist || isEmailExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Exists!');
  }

  const isPhoneNumberExistInSpecialist = await prisma.patient.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });

  const isPhoneNumberExistInAdmin = await prisma.admin.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });

  if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone Number Already Exists!');
  }

  const slots = generateSpecialistSlots(payload.startTime, payload.endTime);

  const specialistRole = Role.DOCTOR;

  const updatedData = { ...payload, slots, role: specialistRole };

  if (!authUser.department?.includes(Role.DOCTOR)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  const result = await prisma.specialist.create({
    data: updatedData,
  });

  return result;
};

const updateSpecialistDoctor = async (
  authUserId: string,
  id: string,
  payload: Specialist
) => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const doctor = await prisma.specialist.findFirst({
    where: {
      id: id,
      role: Role.DOCTOR,
    },
  });

  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Doctor Doesn't Exists!");
  }

  if (payload.email) {
    const isEmailExistInSpecialist = await prisma.patient.findFirst({
      where: {
        email: payload.email,
      },
    });

    const isEmailExistInAdmin = await prisma.admin.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (isEmailExistInSpecialist || isEmailExistInAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Exists!');
    }
  }

  if (payload.phone_number) {
    const isPhoneNumberExistInSpecialist = await prisma.patient.findFirst({
      where: {
        phone_number: payload.phone_number,
      },
    });

    const isPhoneNumberExistInAdmin = await prisma.admin.findFirst({
      where: {
        phone_number: payload.phone_number,
      },
    });

    if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Phone Number Already Exists!'
      );
    }
  }

  if (!authUser.department?.includes(Role.DOCTOR)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  if (payload.startTime) {
    const slots = generateSpecialistSlots(payload.startTime, doctor.endTime);
    payload = { ...payload, slots };
  }

  if (payload.endTime) {
    const slots = generateSpecialistSlots(doctor.startTime, payload.endTime);
    payload = { ...payload, slots };
  }

  const result = await prisma.specialist.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const createSpecialistPsychologist = async (
  authUserId: string,
  payload: Specialist
): Promise<Specialist> => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const isEmailExistInSpecialist = await prisma.patient.findFirst({
    where: {
      email: payload.email,
    },
  });

  const isEmailExistInAdmin = await prisma.admin.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExistInSpecialist || isEmailExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Exists!');
  }

  const isPhoneNumberExistInSpecialist = await prisma.patient.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });

  const isPhoneNumberExistInAdmin = await prisma.admin.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });

  if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone Number Already Exists!');
  }

  const slots = generateSpecialistSlots(payload.startTime, payload.endTime);

  const specialistRole = Role.PSYCHOLOGIST;

  const updatedData = { ...payload, slots, role: specialistRole };

  if (!authUser.department?.includes(Role.PSYCHOLOGIST)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  const result = await prisma.specialist.create({
    data: updatedData,
  });

  return result;
};

const updateSpecialistPsychologist = async (
  authUserId: string,
  id: string,
  payload: Specialist
) => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const psychologist = await prisma.specialist.findFirst({
    where: {
      id: id,
      role: Role.PSYCHOLOGIST,
    },
  });

  if (!psychologist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Psychologist Doesn't Exists!");
  }

  if (payload.email) {
    const isEmailExistInSpecialist = await prisma.patient.findFirst({
      where: {
        email: payload.email,
      },
    });

    const isEmailExistInAdmin = await prisma.admin.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (isEmailExistInSpecialist || isEmailExistInAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Exists!');
    }
  }

  if (payload.phone_number) {
    const isPhoneNumberExistInSpecialist = await prisma.patient.findFirst({
      where: {
        phone_number: payload.phone_number,
      },
    });

    const isPhoneNumberExistInAdmin = await prisma.admin.findFirst({
      where: {
        phone_number: payload.phone_number,
      },
    });

    if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Phone Number Already Exists!'
      );
    }
  }

  if (!authUser.department?.includes(Role.PSYCHOLOGIST)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  if (payload.startTime) {
    const slots = generateSpecialistSlots(
      payload.startTime,
      psychologist.endTime
    );
    payload = { ...payload, slots };
  }

  if (payload.endTime) {
    const slots = generateSpecialistSlots(
      psychologist.startTime,
      payload.endTime
    );
    payload = { ...payload, slots };
  }

  const result = await prisma.specialist.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteSpecialistDoctor = async (authUserId: string, id: string) => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const doctor = await prisma.specialist.findFirst({
    where: {
      id: id,
      role: Role.DOCTOR,
    },
  });

  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Doctor Doesn't Exists!");
  }

  if (!authUser.department?.includes(Role.DOCTOR)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  const result = await prisma.specialist.delete({
    where: {
      id: id,
    },
  });

  return result;
};

const deleteSpecialistPsychologist = async (authUserId: string, id: string) => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const psychologist = await prisma.specialist.findFirst({
    where: {
      id: id,
      role: Role.PSYCHOLOGIST,
    },
  });

  if (!psychologist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Psychologist Doesn't Exists!");
  }

  if (!authUser.department?.includes(Role.PSYCHOLOGIST)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  const result = await prisma.specialist.delete({
    where: {
      id: id,
    },
  });

  return result;
};

const getAllDoctors = async (
  filters: ISpecialistFilterRequest,
  options: IPaginationOptions,
  authUserId: string
): Promise<IGenericResponse<Specialist[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: SpecialistSearchableFields.map(field => ({
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

  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
      OR: [
        {
          role: Role.SUPER_ADMIN,
        },
        {
          role: Role.ADMIN,
          department: Department.DOCTOR_DEPARTMENT,
        },
      ],
    },
  });

  if (!authUser) {
    // If authUser does not exist, throw an API error.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Doctors'
    );
  }

  if (authUser.role === Role.SUPER_ADMIN) {
    // Authenticated user is a SUPER_ADMIN, no need to add conditions.
    andConditions.push({
      role: Role.DOCTOR,
    });
  } else if (authUser.department?.includes(Department.PATIENT_DEPARTMENT)) {
    // When the authUser belongs to the 'USER_MANAGEMENT' department,
    // throw an API error.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Doctors'
    );
  } else if (authUser.department?.includes(Department.DOCTOR_DEPARTMENT)) {
    // Authenticated user is a DOCTOR, add a condition to fetch only doctors.
    andConditions.push({
      role: Role.DOCTOR,
    });
  } else if (
    authUser.department?.includes(Department.PSYCHOLOGIST_DEPARTMENT)
  ) {
    // Authenticated user is in the 'PSYCHOLOGIST_DEPARTMENT', throw an API error.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Doctors'
    );
  }

  const whereConditions: Prisma.SpecialistWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.specialist.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.specialist.count({
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

const getAllPsychologist = async (
  filters: ISpecialistFilterRequest,
  options: IPaginationOptions,
  authUserId: string
): Promise<IGenericResponse<Specialist[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: SpecialistSearchableFields.map(field => ({
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

  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
      OR: [
        {
          role: Role.SUPER_ADMIN,
        },
        {
          role: Role.ADMIN,
          department: Department.PSYCHOLOGIST_DEPARTMENT,
        },
      ],
    },
  });

  if (!authUser) {
    // If authUser does not exist, throw an API error.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Psychologist'
    );
  }

  if (authUser.role === Role.SUPER_ADMIN) {
    // Authenticated user is a SUPER_ADMIN, no need to add conditions.
    andConditions.push({
      role: Role.PSYCHOLOGIST,
    });
  } else if (authUser.department?.includes(Department.PATIENT_DEPARTMENT)) {
    // When the authUser belongs to the 'USER_MANAGEMENT' department,
    // throw an API error.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Psychologist'
    );
  } else if (authUser.department?.includes(Department.DOCTOR_DEPARTMENT)) {
    // Authenticated user is a DOCTOR, add a condition to fetch only doctors.
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to get all Psychologist'
    );
  } else if (
    authUser.department?.includes(Department.PSYCHOLOGIST_DEPARTMENT)
  ) {
    // Authenticated user is in the 'PSYCHOLOGIST_DEPARTMENT', throw an API error.
    andConditions.push({
      role: Role.PSYCHOLOGIST,
    });
  }

  const whereConditions: Prisma.SpecialistWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.specialist.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.specialist.count({
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

const getSingleDoctor = async (
  id: string,
  authUserId: string
): Promise<Specialist | null> => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const whereConditions: Prisma.SpecialistWhereUniqueInput = { id };

  if (authUser) {
    if (authUser.role === Role.SUPER_ADMIN) {
      //do nothing here
      whereConditions.role = Role.DOCTOR;
    } else if (authUser.department === Department.PATIENT_DEPARTMENT) {
      // When the authUser belongs to the 'USER_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'user'.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
      // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'doctor'.
      whereConditions.role = Role.DOCTOR;
    } else if (authUser.department === Department.PSYCHOLOGIST_DEPARTMENT) {
      // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'psychologist'.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    } else {
      // If the authUser is not authorized, throw an API error.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    }
  }

  const result = await prisma.specialist.findUnique({
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

const getSinglePsychologist = async (
  id: string,
  authUserId: string
): Promise<Specialist | null> => {
  const authUser = await prisma.admin.findFirst({
    where: {
      id: authUserId,
    },
  });

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const whereConditions: Prisma.SpecialistWhereUniqueInput = { id };

  if (authUser) {
    if (authUser.role === Role.SUPER_ADMIN) {
      //do nothing here
      whereConditions.role = Role.PSYCHOLOGIST;
    } else if (authUser.department === Department.PATIENT_DEPARTMENT) {
      // When the authUser belongs to the 'USER_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'user'.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
      // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'doctor'.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    } else if (authUser.department === Department.PSYCHOLOGIST_DEPARTMENT) {
      // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
      // add a condition to fetch only users with the role 'psychologist'.
      whereConditions.role = Role.PSYCHOLOGIST;
    } else {
      // If the authUser is not authorized, throw an API error.
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access'
      );
    }
  }

  const result = await prisma.specialist.findUnique({
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

export const SpecialistService = {
  createSpecialistDoctor,
  updateSpecialistDoctor,
  createSpecialistPsychologist,
  updateSpecialistPsychologist,
  deleteSpecialistDoctor,
  deleteSpecialistPsychologist,
  getAllDoctors,
  getAllPsychologist,
  getSingleDoctor,
  getSinglePsychologist,
};
