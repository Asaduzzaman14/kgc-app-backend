import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { donnoeFilterableFields } from './user.constant';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.create(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully registation complete',
      data: result,
    });
  }
);

const getDonors = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;

  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, donnoeFilterableFields);

  const result = await UserService.getDonorsFromDb(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Succesfully',
    data: result,
  });
});

export const UserController = {
  create,
  getDonors,
};
