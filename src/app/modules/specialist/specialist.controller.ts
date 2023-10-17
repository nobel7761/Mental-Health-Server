import { Specialist } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SpecialistFilterAbleFileds } from './specialist.constants';
import { SpecialistService } from './specialist.service';

const createSpecialistDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;

    const result = await SpecialistService.createSpecialistDoctor(
      authUserId,
      req.body
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Created Successfully',
      data: result,
    });
  }
);

const updateSpecialistDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;
    const { id } = req.params;

    const result = await SpecialistService.updateSpecialistDoctor(
      authUserId,
      id,
      req.body
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor's Info Updates Successfully",
      data: result,
    });
  }
);

const createSpecialistPsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;

    const result = await SpecialistService.createSpecialistPsychologist(
      authUserId,
      req.body
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Created Successfully',
      data: result,
    });
  }
);

const updateSpecialistPsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;
    const { id } = req.params;

    const result = await SpecialistService.updateSpecialistPsychologist(
      authUserId,
      id,
      req.body
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Psychologist's Info Updates Successfully",
      data: result,
    });
  }
);

const deleteSpecialistDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;
    const { id } = req.params;

    const result = await SpecialistService.deleteSpecialistDoctor(
      authUserId,
      id
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Deleted Successfully',
      data: result,
    });
  }
);

const deleteSpecialistPsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;
    const { id } = req.params;

    const result = await SpecialistService.deleteSpecialistPsychologist(
      authUserId,
      id
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Deleted Successfully',
      data: result,
    });
  }
);

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const filters = pick(req.query, SpecialistFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await SpecialistService.getAllDoctors(
    filters,
    options,
    authUserId
  );

  sendResponse<Specialist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllPsychologist = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const filters = pick(req.query, SpecialistFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await SpecialistService.getAllPsychologist(
    filters,
    options,
    authUserId
  );

  sendResponse<Specialist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Psychologist's Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;
  const result = await SpecialistService.getSingleDoctor(id, authUserId);

  sendResponse<Specialist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Data Fetched successfully',
    data: result,
  });
});

const getSinglePsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;

    const { id } = req.params;
    const result = await SpecialistService.getSinglePsychologist(
      id,
      authUserId
    );

    sendResponse<Specialist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Data Fetched successfully',
      data: result,
    });
  }
);

export const SpecialistController = {
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
