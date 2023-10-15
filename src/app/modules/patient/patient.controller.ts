import { Patient } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PatientService } from './patient.service';

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.createPatient(req.body);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Created Successfully',
    data: result,
  });
});

export const PatientController = {
  createPatient,
};
