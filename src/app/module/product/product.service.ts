import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IProduct } from './product.interface';
import { Products } from './product.models';
import { deleteUserImage } from './product.utils';

const create = async (data: IProduct): Promise<IProduct | null> => {
  console.log(data);

  if (!data.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user Token not found');
  }

  const result = await Products.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to uplode Product');
  }

  return result;
};

const getAllData = async (): Promise<IProduct[]> => {
  const result = await Products.find({}).populate('userId');

  return result;
};

const getSingleData = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IProduct
): Promise<IProduct | null> => {
  const result = await Products.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IProduct | null> => {
  const existingRecord = await Products.findById(id);

  if (!existingRecord) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data Not found');
  }

  if (existingRecord) {
    const oldImageUrl = existingRecord?.img;
    if (oldImageUrl) {
      deleteUserImage(oldImageUrl);
    }
  }

  if (existingRecord) {
    const oldImageUrl = existingRecord?.img2;
    if (oldImageUrl) {
      deleteUserImage(oldImageUrl);
    }
  }

  const result = await Products.findByIdAndDelete(id);
  return result;
};

const getMyAlldata = async (
  user: JwtPayload | null | any
): Promise<IProduct[] | null> => {
  console.log(user);

  if (!user._id) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'user not found');
  }
  const result = await Products.find({
    userId: user._id,
  });
  return result;
};

const getById = async (id: string): Promise<any> => {
  const result = await Products.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
  //
  getMyAlldata,
  getById,
};
