import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AppointmentService } from './appointment.service';

const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await AppointmentService.createAppointment(
    authUserId,
    req.body
  );

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment Placed Successfully',
    data: result,
  });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await AppointmentService.deleteAppointment(authUserId, id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment Deleted Successfully',
    data: result,
  });
});

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await AppointmentService.updateAppointment(
    authUserId,
    id,
    req.body
  );

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment Updated Successfully',
    data: result,
  });
});

export const AppointmentController = {
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
