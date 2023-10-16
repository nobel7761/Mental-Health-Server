/* eslint-disable @typescript-eslint/no-explicit-any */
import { Department, Patient, Prisma, Role } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { PatientSearchableFields } from './patient.constants';
import { IPatientFilterRequest } from './patient.interfaces';

const createPatient = async (data: Patient): Promise<Patient> => {
  const isEmailExistsInAdmin = await prisma.admin.findFirst({
    where: {
      email: data.email,
    },
  });

  const isEmailExistsInSpecialist = await prisma.admin.findFirst({
    where: {
      email: data.email,
    },
  });

  if (isEmailExistsInAdmin || isEmailExistsInSpecialist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Email Found!');
  }

  const isPhoneNumberExistsInPatient = await prisma.admin.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  const isPhoneNumberExistsInSpecialist = await prisma.admin.findFirst({
    where: {
      phone_number: data.phone_number,
    },
  });

  if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Duplicate Phone Number Found!');
  }

  const payload = { ...data, role: Role.PATIENT };

  const result = await prisma.patient.create({
    data: payload,
  });

  return result;
};

const updatePatient = async (
  id: string,
  dataToUpdate: Partial<Patient>,
  authUserId?: string
): Promise<Patient | null> => {
  const isExists = await prisma.patient.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Patient Doesn't Exist");
  }

  const whereConditions: Prisma.PatientWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === Department.PATIENT_DEPARTMENT) {
        // When the authUser belongs to the 'Patient_MANAGEMENT' department,
        // allow updating only for Patients with the role 'Patient'.
        whereConditions.role = Role.PATIENT;
      } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // allow updating only for Patients with the role 'doctor'.
        whereConditions.role = Role.DOCTOR;
      } else if (authUser.department === Department.PSYCHOLOGIST_DEPARTMENT) {
        // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
        // allow updating only for Patients with the role 'psychologist'.
        whereConditions.role = Role.PSYCHOLOGIST;
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to update this Patient'
        );
      }
    }
  }

  const existingPatient = await prisma.patient.findUnique({
    where: whereConditions,
  });

  if (!existingPatient) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to access'
    );
  }

  // Perform the update using Prisma.
  const updatedPatient = await prisma.patient.update({
    where: whereConditions,
    data: dataToUpdate,
  });

  return updatedPatient;
};

const deletePatient = async (
  id: string,
  authUserId?: string
): Promise<Patient | null> => {
  const isExists = await prisma.patient.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Patient Doesn't Exists");
  }
  const whereConditions: Prisma.PatientWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.department === Department.PATIENT_DEPARTMENT) {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // allow deleting only users with the role 'user'.
        whereConditions.role = Role.PATIENT;
      } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // allow deleting only users with the role 'doctor'.
        whereConditions.role = Role.DOCTOR;
      } else if (authUser.department === Department.PSYCHOLOGIST_DEPARTMENT) {
        // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
        // allow deleting only users with the role 'psychologist'.
        whereConditions.role = Role.PSYCHOLOGIST;
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to delete this user'
        );
      }
    }
  }

  const existingPatient = await prisma.patient.findUnique({
    where: whereConditions,
  });

  if (!existingPatient) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this user'
    );
  }

  // Perform the deletion using Prisma.
  const result = await prisma.patient.delete({
    where: whereConditions,
  });

  return result;
};

const getAllPatient = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
  authUserId?: string
): Promise<IGenericResponse<Patient[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: PatientSearchableFields.map(field => ({
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
      if (authUser.role === Role.SUPER_ADMIN) {
        //do nothing here!
      } else if (authUser.department === Department.PATIENT_DEPARTMENT) {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'user'.
        andConditions.push({
          role: Role.PATIENT,
        });
      } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to get all Patient'
        );
      } else if (authUser.department === Department.PSYCHOLOGIST_DEPARTMENT) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to get all Patient'
        );
      } else {
        // If the authUser is not authorized, throw an API error.
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to get all Patient'
        );
      }
    }
  }

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.patient.count({
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

const getSinglePatient = async (
  id: string,
  authUserId?: string
): Promise<Patient | null> => {
  const isExists = await prisma.patient.findFirst({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exist");
  }

  const whereConditions: Prisma.PatientWhereUniqueInput = { id };

  if (authUserId) {
    const authUser = await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    });

    if (authUser) {
      if (authUser.role === Role.SUPER_ADMIN) {
        //do nothing here
      } else if (authUser.department === Department.PATIENT_DEPARTMENT) {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'user'.
        whereConditions.role = Role.PATIENT;
      } else if (authUser.department === Department.DOCTOR_DEPARTMENT) {
        // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
        // add a condition to fetch only users with the role 'doctor'.
        whereConditions.role = Role.DOCTOR;
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
  }

  const result = await prisma.patient.findUnique({
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

export const PatientService = {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatient,
  getSinglePatient,
};
