import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IScrollText } from './scrollText.interface';
import { Services } from './scrollText.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await Services.create(data);
    sendResponse<IScrollText>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully  Notice added',
      data: result,
    });
  }
);

//  get All active data
const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Succesfully',
    data: result,
  });
});

//  get All
const getAlldataForAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllDataForAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All data Retrieved Succesfully',
    data: result,
  });
});
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IScrollText>(res, {
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

  sendResponse<IScrollText>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice successfully updated',
    data: result,
  });
});

// // Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IScrollText>(res, {
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
  getAlldataForAdmin,
};
