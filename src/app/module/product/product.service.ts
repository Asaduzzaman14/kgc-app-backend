import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProduct } from './product.interface';
import { Products } from './product.models';

const create = async (data: IProduct): Promise<IProduct | null> => {
  console.log(data);
  return;
  const result = await Products.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to uplode Product');
  }

  return result;
};

const getAllData = async (): Promise<IProduct[]> => {
  const result = await Products.find({}).sort({
    createdAt: -1,
  });
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
  console.log(paylode);

  const result = await Products.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
