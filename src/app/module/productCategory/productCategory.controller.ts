import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { baseUrl } from '../../../constants/config';
import { paginationFields } from '../../../constants/pagination';
import { deleteImage } from '../../../helpers/fileDelete';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './productCategory.constant';
import { IProductsCategory } from './productCategory.interface';
import { Services } from './productCategory.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const file = req?.file;

    if (file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${file.filename}`;
      data.data.img = imageUrl;
    }

    const result = await Services.create(data.data);

    sendResponse<IProductsCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully data added',
      data: result,
    });
  }
);

//  get All Order

const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const user = req?.user;
  console.log(user, 'user');

  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, customerFilterableFields);

  const result = await Services.getAllData(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Retrieved  Succesfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleData(id);

  sendResponse<IProductsCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Category Retrieved Successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  // console.log(req.body);

  const data = req.body;
  const file = req?.file;

  if (file) {
    // Fetch the existing record to get the current image URL
    const existingRecord = await Services.getDataById(id);
    const oldImageUrl = existingRecord?.img;
    if (oldImageUrl) {
      deleteImage(oldImageUrl);
    }
    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/${file!.filename}`;
    // const imageUrl = `http://localhost:5000/uploads/${file!.filename}`;

    data.data.img = imageUrl;
  }

  const result = await Services.updateDataById(id, data.data);

  sendResponse<IProductsCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Category successfully updated',
    data: result,
  });
});

// Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const existingRecord = await Services.getDataById(id);

  if (existingRecord) {
    const oldImageUrl = existingRecord?.img;
    if (oldImageUrl) {
      deleteImage(oldImageUrl);
    }
  }

  const result = await Services.deleteData(id);

  sendResponse<IProductsCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Category deleted Successfully',
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
