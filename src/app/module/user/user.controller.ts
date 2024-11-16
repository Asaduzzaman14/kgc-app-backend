import { Request, RequestHandler, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import { baseUrl } from '../../../constants/config';
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

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getprofile(user!._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Retrieved Successfully',
    data: result,
  });
});

// update Parts By Id
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const updatedData = req.body;

  if (req.file) {
    updatedData.image = `${baseUrl}/uploads/images/${req?.file?.filename}`;
  }

  const findUser = await UserService.getprofile(user!._id);

  if (
    findUser &&
    findUser.image &&
    updatedData.image &&
    findUser.image !== updatedData.image
  ) {
    const oldImageFileName = path.basename(findUser.image); // Extracts the filename from the URL (e.g., "image-1731779095102.jpeg")
    const oldImagePath = path.join(
      process.cwd(),
      'uploads/images',
      oldImageFileName
    );

    try {
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
        console.log('Old image deleted successfully');
      } else {
        console.log('Old image not deleted');
      }
    } catch (error) {
      console.error('Error deleting old image:', error);
    }
  }

  console.log(updatedData);

  const result = await UserService.updateDataById(user!._id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile successfully updated',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  const result = await UserService.deleteData(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted Successfully',
    data: result,
  });
});

export const UserController = {
  create,
  getDonors,
  getDataById,
  updateProfile,
  deleteData,
};
