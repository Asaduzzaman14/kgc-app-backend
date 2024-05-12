import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, Response: Response, next: NextFunction) => {
    try {
      console.log(requiredRoles);

      // get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verified token
      let verifyUser = null;
      try {
        verifyUser = jwtHelpers.verifyToken(
          token,
          config.jwt_access_secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
      }
      req.user = verifyUser; // role, userId
      // console.log(verifyUser, '111111');

      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
