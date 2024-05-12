import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { customerSearchableFields } from './servicesCatagory.constant';
import {
  IFilterRequest,
  IServicesCatagory,
} from './servicesCatagory.interface';
import { ServicesCatagory } from './servicesCatagory.models';

const create = async (
  user: IServicesCatagory
): Promise<IServicesCatagory | null> => {
  console.log(user);

  const newCustomer = await ServicesCatagory.create(user);
  if (!newCustomer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Customer');
  }

  return newCustomer;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IServicesCatagory[]>> => {
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

  const result = await ServicesCatagory.find(requestCondetion)
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await ServicesCatagory.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IServicesCatagory | null> => {
  const result = await ServicesCatagory.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IServicesCatagory
): Promise<IServicesCatagory | null> => {
  const result = await ServicesCatagory.findByIdAndUpdate(
    { _id: id },
    paylode,
    {
      new: true,
    }
  );
  return result;
};

const deleteData = async (id: string): Promise<IServicesCatagory | null> => {
  const result = await ServicesCatagory.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
