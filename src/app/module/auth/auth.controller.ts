import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IloginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  // console.log(loginData);

  const result = await AuthService.login(loginData);

  // const { refreshToken } = result;

  // // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loged in successfully',
    data: result,
  });

  // console.log(req.body);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const { ...passwordData } = req.body;

  console.log(passwordData, user, '111111');

  const result = await AuthService.passwordChange(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully',
    data: result,
  });

  // console.log(req.body);
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken, 'my token');

  const result = await AuthService.refreshToken(refreshToken);
  // console.log(result, 'refreshToken');

  // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // sendResponse<IRefreshTokenResponse>(res, {
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });

  // console.log(req.body);
});

export const AuthController = {
  login,
  changePassword,
  refreshToken,
};
