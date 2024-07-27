/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../auth/auth.model';
import { customerSearchableFields } from './services.constant';
import { IFilterRequest, IServices } from './services.interface';
import { ServiceModal } from './services.models';

const create = async (
  data: IServices,
  user: JwtPayload | null
): Promise<IServices | null> => {
  console.log(user);

  console.log(data);

  if (user?.role == 'user') {
    const getUser = await User.findById(user?._id);

    if (getUser) {
      data.email = getUser?.email;
      data.name = getUser?.name;
      data.phone = getUser?.phone;
      data.location = getUser?.upazila;
    }
  }

  const newService = await ServiceModal.create(data);
  console.log(newService);

  if (!newService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add service');
  }

  return newService;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IServices[]>> => {
  // pagination helpers
  const { page, limit, sortBy, sortOrder } =
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

  andCondation.push({
    status: true,
  });

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await ServiceModal.find(requestCondetion)
    .populate('servicesCatagory')
    .sort(sortCondations);
  // .skip(skip)
  // .limit(limit);

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

const getAllDataForAdmin = async (
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
  console.log(paylode, id);

  const result = await ServiceModal.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IServices | null> => {
  const result = await ServiceModal.findByIdAndDelete(id);
  return result;
};

const getMyData = async (
  user: JwtPayload | null
): Promise<IServices[] | null> => {
  const result = await ServiceModal.find({ email: user?.email }).populate(
    'servicesCatagory'
  );
  return result;
};

export const Services = {
  create,
  getAllData,
  getAllDataForAdmin,
  getSingleData,
  updateDataById,
  deleteData,
  getMyData,
};
