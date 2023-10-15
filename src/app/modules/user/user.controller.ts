import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserFilterAbleFileds } from './user.constants';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await UserService.getMyProfile(authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Data Fetched Successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const id = decodedToken?.payload?.id as string;

  const result = await UserService.updateMyProfile(id, req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Profile Info Updated Successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const filters = pick(req.query, UserFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, options, authUserId);

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;
  const result = await UserService.getSingleUser(id, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Data Fetched successfully',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await UserService.updateSingleUser(id, req.body, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile Updated Successfully',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await UserService.deleteSingleUser(id, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  });
});

const createPsychologist = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await UserService.createPsychologist(req.body, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Psychologist Created Successfully',
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

    const result = await UserService.getSinglePsychologist(id, authUserId);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Data Retrieved Successfully',
      data: result,
    });
  }
);

const updateSinglePsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;

    const { id } = req.params;

    const result = await UserService.updateSinglePsychologist(
      id,
      authUserId,
      req.body
    );

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Data Updated Successfully',
      data: result,
    });
  }
);

const deleteSinglePsychologist = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;
    const decodedToken = jwt.decode(accessToken, { complete: true }) as {
      payload: JwtPayload;
    } | null;
    const authUserId = decodedToken?.payload?.id as string;

    const { id } = req.params;

    const result = await UserService.deleteSinglePsychologist(id, authUserId);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Psychologist Deleted Successfully',
      data: result,
    });
  }
);

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await UserService.createDoctor(req.body, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Created Successfully',
    data: result,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await UserService.getSingleDoctor(id, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Data Retrieved Successfully',
    data: result,
  });
});

const updateSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await UserService.updateSingleDoctor(id, authUserId, req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Data Updated Successfully',
    data: result,
  });
});

const deleteSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const { id } = req.params;

  const result = await UserService.deleteSingleDoctor(id, authUserId);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor Deleted Successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getMyProfile,
  updateMyProfile,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createPsychologist,
  getSinglePsychologist,
  updateSinglePsychologist,
  deleteSinglePsychologist,
  createDoctor,
  getSingleDoctor,
  updateSingleDoctor,
  deleteSingleDoctor,
};
