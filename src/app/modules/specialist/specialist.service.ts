import { Role, Specialist } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { generateDoctorSlots } from './specialist.utils';

const createSpecialist = async (
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

  const isEmailExistInPatient = await prisma.patient.findFirst({
    where: {
      email: payload.email,
    },
  });
  const isEmailExistInAdmin = await prisma.admin.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExistInPatient || isEmailExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Exists!');
  }

  const isPhoneNumberExistInPatient = await prisma.patient.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });
  const isPhoneNumberExistInAdmin = await prisma.admin.findFirst({
    where: {
      phone_number: payload.phone_number,
    },
  });

  if (isPhoneNumberExistInPatient || isPhoneNumberExistInAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone Number Already Exists!');
  }

  const slots = generateDoctorSlots(payload.startTime, payload.endTime);

  const updatedData = { ...payload, slots };

  //   console.log('role', authUser.department?.includes(Role.DOCTOR));

  if (
    !authUser.department?.includes(Role.DOCTOR) &&
    !authUser.department?.includes(Role.PSYCHOLOGIST) &&
    authUser.role !== Role.SUPER_ADMIN
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  if (payload.role !== Role.DOCTOR && payload.role !== Role.PSYCHOLOGIST) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role is not currect!');
  } else {
    // const result = await prisma.specialist.create({
    //   data: payload,
    // });

    // return result;

    console.log(updatedData);
  }
};

export const SpecialistService = {
  createSpecialist,
};
