/* eslint-disable no-undef */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { baseUrl } from '../../../constants/config';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Services } from './product.service';
import { deleteUserImage } from './product.utils';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const multerReq = req as any;
    const data = multerReq.body;
    const files = multerReq.files;
    const user = req.user;

    const processFile = async (fileKey: string, dataKey: string) => {
      const file = files?.[fileKey]?.[0];
      if (file) {
        data[dataKey] = `${baseUrl}/uploads/users/${file.filename}`;
      }
    };

    await processFile('img', 'img');
    await processFile('img2', 'img2');
    await processFile('img3', 'img3');

    const newData = {
      ...data,
      userId: user!._id,
      img: data.img,
      img2: data.img2,
      img3: data.img3,
    };
    console.log(newData);

    const result = await Services.create(newData);
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully  product added',
      data: result,
    });
  }
);
type MulterRequest = {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
} & Request;

// update By Id
const updateData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const multerReq = req as MulterRequest;
    const { id } = multerReq.params;
    const data = multerReq.body;
    const files = multerReq.files;

    const processFile = async (fileKey: string, dataKey: string) => {
      const file = files?.[fileKey]?.[0];
      if (file) {
        data[dataKey] = `${baseUrl}/uploads/users/${file.filename}`;

        const existingRecord = await Services.getById(id);
        const oldImageUrl = existingRecord?.[dataKey];
        console.log(oldImageUrl, 'oldImageUrl');

        if (oldImageUrl) {
          deleteUserImage(oldImageUrl);
        }
      }
    };

    await processFile('img', 'img');
    await processFile('img2', 'img2');
    await processFile('img3', 'img3');

    const updatedData = {
      ...data,
      img: data.img,
      img2: data.img2,
      img3: data.img3,
    };

    const result = await Services.updateDataById(id, updatedData);

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services successfully updated',
      data: result,
    });
  }
);

//  get All
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
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Successfully',
    data: result,
  });
});

// Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data deleted Successfully',
    data: result,
  });
});

const getMyAlldata = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user, 'users');

  const result = await Services.getMyAlldata(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved Succesfully',
    data: result,
  });
});

// update data By Id
const updateCountData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.updateCountDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product count successfully updated',
    data: result,
  });
});

export const Controller = {
  create,
  getAlldata,
  updateData,
  getDataById,
  deleteData,
  getMyAlldata,
  updateCountData,
};
