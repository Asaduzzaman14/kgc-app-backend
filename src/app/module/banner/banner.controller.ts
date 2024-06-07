import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBanner } from './banner.interface';
import { Services } from './banner.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await Services.create(data);
    sendResponse<IBanner>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully  banner added',
      data: result,
    });
  }
);

//  get All
const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Succesfully',
    data: result,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IBanner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Successfully',
    data: result,
  });
});

// // update Parts By Id
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Services.updateDataById(id, updatedData);

  sendResponse<IBanner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services successfully updated',
    data: result,
  });
});

// // Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IBanner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data deleted Successfully',
    data: result,
  });
});

export const Controller = {
  create,
  getAlldata,
  updateData,
  getDataById,
  deleteData,
};
