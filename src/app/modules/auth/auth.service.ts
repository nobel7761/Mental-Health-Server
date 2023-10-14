import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse } from './auth.interfaces';

const login = async (
  payload: Pick<User, 'email' | 'password'>
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  let isExists;

  isExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  isExists = await prisma.admin.findFirst({
    where: {
      email: email,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Does Not Exists!');
  }

  if (isExists.password !== password)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Does Not Match');

  // if user exists and password match then JWT will generate a token witch will be sent from server side to client side. client side will store this token in the browser(localstorage/cookies) so that when user try to login for the next(hit the url) time then user does not need to give id, password again(if the token does not expired) to login. Then we'll send this token with every single request and server will check the token. if the token is authorized then user can make request and then server will give the access through route(so we need to handle this from route level). otherwise user will get failed.

  // create access token & refresh token
  const { id, role } = isExists;

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
