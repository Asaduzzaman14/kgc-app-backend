import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { customerSearchableFields } from './services.constant';
import { IFilterRequest, IServices } from './services.interface';
import { ServiceModal } from './services.models';

const create = async (data: IServices): Promise<IServices | null> => {
  console.log(data);

  const newCustomer = await ServiceModal.create(data);

  if (!newCustomer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Customer');
  }

  return newCustomer;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IServices[]>> => {
  // pagination helpers
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: customerSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // if (searchTerm) {
  //   andCondation.push({
  //     servicesCatagory: filters.servicesCatagory,
  //   });
  // }

  if (Object.keys(filtersData).length) {
    andCondation.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await ServiceModal.find(requestCondetion)
    .populate('servicesCatagory')
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await ServiceModal.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IServices | null> => {
  const result = await ServiceModal.findById(id)
    .populate('servicesCatagory')
    .populate('user');
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IServices
): Promise<IServices | null> => {
  console.log(paylode,id);
  
  const result = await ServiceModal.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IServices | null> => {
  const result = await ServiceModal.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
