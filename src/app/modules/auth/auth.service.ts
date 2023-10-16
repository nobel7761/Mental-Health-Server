import { Patient, Role } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse, IProfileDataResponse } from './auth.interfaces';

const loginProfile = async (
  payload: Pick<Patient, 'email' | 'password'>
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  // Check if the user exists in any of the tables
  const user =
    (await prisma.patient.findFirst({
      where: {
        email: email,
      },
    })) ||
    (await prisma.admin.findFirst({
      where: {
        email: email,
      },
    })) ||
    (await prisma.specialist.findFirst({
      where: {
        email: email,
      },
    }));

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Does Not Exist!');
  }

  //! Verify the password using bcrypt
  // const passwordMatch = await bcrypt.compare(password, user.password);
  // if (!passwordMatch) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password');
  // }

  if (user.password !== password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password Does Not Match!');
  }

  // User exists and password is correct, create access and refresh tokens
  const { id, role } = user;

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMyProfile = async (
  authUserId: string
): Promise<IProfileDataResponse | null> => {
  // You can use the authUserId and authUserRole to determine the role-based access if needed
  // In this example, we are only using authUserId to fetch the user's profile

  // Find the user by ID, assuming the user can exist in any of the three tables
  const user =
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

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  // If you need to return specific user data based on their role, you can add conditional logic here

  // Return the user's profile data
  return user;
};

const updateProfile = async (
  authUserId: string,
  updatedProfileData: Partial<IProfileDataResponse>
): Promise<IProfileDataResponse | null> => {
  // find the user first
  const user =
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

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  let updatedUser = null;

  if (user.role === Role.PATIENT) {
    updatedUser = await prisma.patient.update({
      where: { id: authUserId },
      data: updatedProfileData,
    });
  } else if (user.role === Role.ADMIN) {
    updatedUser = await prisma.admin.update({
      where: { id: authUserId },
      data: updatedProfileData,
    });
  } else if (user.role === Role.SUPER_ADMIN) {
    updatedUser = await prisma.admin.update({
      where: { id: authUserId },
      data: updatedProfileData,
    });
  } else if (user.role === Role.DOCTOR || user.role === Role.PSYCHOLOGIST) {
    updatedUser = await prisma.specialist.update({
      where: { id: authUserId },
      data: updatedProfileData,
    });
  }

  // If you need to return specific user data based on their role, you can add conditional logic here

  // Return the updated user's profile data
  return updatedUser;
};

export const AuthService = {
  loginProfile,
  getMyProfile,
  updateProfile,
};
