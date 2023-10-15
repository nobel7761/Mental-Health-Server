import { Patient, Role } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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

export const PatientService = {
  createPatient,
};
