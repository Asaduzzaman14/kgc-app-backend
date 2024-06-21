import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser, IloginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await AuthService.create(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully registation complete',
      data: result,
    });
  }
);

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  // console.log(loginData);

  const result = await AuthService.login(loginData);

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

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

const forgotPass = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgotPass(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Check your email!',
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';

  // console.log(token, req.body);
  // return;

  await AuthService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Account recovered!',
  });
});

export const AuthController = {
  create,
  login,
  changePassword,
  refreshToken,

  forgotPass,
  resetPassword,
};
