import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBanner } from './banner.interface';
import { Banner } from './banner.models';

const create = async (data: IBanner): Promise<IBanner | null> => {
  console.log(data);
  const result = await Banner.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post banner');
  }

  return result;
};

const getAllData = async (): Promise<IBanner[]> => {
  const result = await Banner.find({}).sort({
    createdAt: -1,
  });
  return result;
};

const getSingleData = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IBanner
): Promise<IBanner | null> => {
  console.log(paylode);

  const result = await Banner.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
