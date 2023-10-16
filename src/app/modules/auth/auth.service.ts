import { Patient } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse } from './auth.interfaces';

const login = async (
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

export const AuthService = {
  login,
};
