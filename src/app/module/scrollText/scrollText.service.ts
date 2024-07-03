import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IScrollText } from './scrollText.interface';
import { ScrollText } from './scrollText.models';

const create = async (data: IScrollText): Promise<IScrollText | null> => {
  const isExist = await ScrollText.find({});

  if (isExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Notise already exist');
  }

  const result = await ScrollText.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post notice');
  }

  return result;
};

const getAllData = async (): Promise<IScrollText[]> => {
  const result = await ScrollText.find({
    status: 'active',
  });
  console.log(result);

  return result;
};

const getAllDataForAdmin = async (): Promise<IScrollText[]> => {
  const result = await ScrollText.find({});
  console.log(result);

  return result;
};

const getSingleData = async (id: string): Promise<IScrollText | null> => {
  const result = await ScrollText.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IScrollText
): Promise<IScrollText | null> => {
  const result = await ScrollText.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IScrollText | null> => {
  const result = await ScrollText.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  getAllDataForAdmin,
  updateDataById,
  deleteData,
};
