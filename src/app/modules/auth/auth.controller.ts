import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interfaces';
import { AuthService } from './auth.service';

const loginProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginProfile(req.body);

  const { refreshToken, ...others } = result as ILoginUserResponse;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true, // to make sure that this cookie won't be accessible from client side
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In successfully!',
    token: others.accessToken,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await AuthService.getMyProfile(authUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Data Retrieved successfully!',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const updatedProfile = await AuthService.updateProfile(authUserId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Data Updated successfully!',
    data: updatedProfile,
  });
});

export const AuthController = {
  loginProfile,
  getMyProfile,
  updateProfile,
};
