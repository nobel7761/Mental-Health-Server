import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import moment from 'moment';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createAppointment = async (
  authUserId: string,
  payload: Booking
): Promise<Booking> => {
  try {
    const authUser =
      (await prisma.patient.findFirst({
        where: {
          id: authUserId,
        },
      })) ||
      (await prisma.admin.findFirst({
        where: {
          id: authUserId,
        },
      })) ||
      (await prisma.specialist.findFirst({
        where: {
          id: authUserId,
        },
      }));

    if (!authUser) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    const isSlotExists = await prisma.booking.findFirst({
      where: {
        slot: payload.slot,
        date: payload.date,
        specialistId: payload.specialistId,
      },
    });

    const specialist = await prisma.specialist.findFirst({
      where: {
        id: payload.specialistId,
      },
    });

    if (isSlotExists) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `${specialist?.name} is busy on ${moment(payload.date).format(
          `Do of MMMM, YYYY`
        )} at ${payload.slot}`
      );
    }

    //inserting patient id from the auth user.
    payload = { ...payload, patientId: authUser.id };

    const result = await prisma.booking.create({
      data: payload,
      include: {
        specialist: true,
        patient: true,
      },
    });

    return result;
  } catch (error) {
    // Handle the error, log it, and provide more information about the issue.
    console.error('Error creating appointment:', error);
    throw error; // Rethrow the error to propagate it to the caller.
  }
};

const updateAppointment = async (
  authUserId: string,
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const authUser =
    (await prisma.patient.findFirst({
      where: {
        id: authUserId,
      },
    })) ||
    (await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    })) ||
    (await prisma.specialist.findFirst({
      where: {
        id: authUserId,
      },
    }));

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No Booking Found');
  }

  const isSlotExists = await prisma.booking.findFirst({
    where: {
      slot: payload.slot,
      date: payload.date,
      specialistId: booking.specialistId,
    },
  });

  const specialist = await prisma.specialist.findFirst({
    where: {
      id: booking.specialistId,
    },
  });

  if (isSlotExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${specialist?.name} is busy on ${moment(payload.date).format(
        `Do of MMMM, YYYY`
      )} at ${payload.slot}`
    );
  }

  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
    include: {
      specialist: true,
      patient: true,
    },
  });

  return result;
};

const deleteAppointment = async (
  authUserId: string,
  id: string
): Promise<Booking> => {
  const authUser =
    (await prisma.patient.findFirst({
      where: {
        id: authUserId,
      },
    })) ||
    (await prisma.admin.findFirst({
      where: {
        id: authUserId,
      },
    })) ||
    (await prisma.specialist.findFirst({
      where: {
        id: authUserId,
      },
    }));

  if (!authUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found.');
  }

  if (authUser.id === booking.patientId) {
    const result = await prisma.booking.delete({
      where: {
        id,
      },
      include: {
        specialist: true,
        patient: true,
      },
    });

    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'you are not authorized!');
  }
};

export const AppointmentService = {
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
