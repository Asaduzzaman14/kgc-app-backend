import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './services.constant';
import { IServices } from './services.interface';
import { Services } from './services.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user: JwtPayload | null = req.user;
    const result = await Services.create(data, user);

    sendResponse<IServices>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Services added',
      data: result,
    });
  }
);

//  get All data

const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;

  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, customerFilterableFields);

  const result = await Services.getAllData(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Succesfully',
    data: result,
  });
});

const getAlldataFAdmin = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;

  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, customerFilterableFields);

  const result = await Services.getAllDataForAdmin(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admin Data Retrieved Succesfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IServices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services Retrieved Successfully',
    data: result,
  });
});

// update Parts By Id
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Services.updateDataById(id, updatedData);

  sendResponse<IServices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services successfully updated',
    data: result,
  });
});

// update data By Id
const updateCountData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.updateCountDataById(id);

  sendResponse<IServices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services count successfully updated',
    data: result,
  });
});

// Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IServices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services deleted Successfully',
    data: result,
  });
});

const getMydata = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;

  const result = await Services.getMyData(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved  Succesfully',
    data: result,
  });
});

export const Controller = {
  create,
  getAlldata,
  getAlldataFAdmin,

  updateData,
  updateCountData,

  getDataById,
  deleteData,
  getMydata,
};
