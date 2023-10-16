import { Patient } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PatientFilterAbleFileds } from './patient.constants';
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

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await PatientService.updatePatient(id, req.body, authUserId);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Info Updated Successfully',
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await PatientService.deletePatient(id, authUserId);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Deleted successfully',
    data: result,
  });
});

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const filters = pick(req.query, PatientFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await PatientService.getAllPatient(
    filters,
    options,
    authUserId
  );

  sendResponse<Patient[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patients Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;
  const result = await PatientService.getSinglePatient(id, authUserId);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Data Fetched successfully',
    data: result,
  });
});

export const PatientController = {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatient,
  getSinglePatient,
};
