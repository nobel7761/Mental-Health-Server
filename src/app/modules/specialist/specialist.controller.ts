import { Specialist } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SpecialistService } from './specialist.service';

const createSpecialist = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await SpecialistService.createSpecialist(authUserId, req.body);

  sendResponse<Specialist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialist Created Successfully',
    data: result,
  });
});

export const SpecialistController = {
  createSpecialist,
};
