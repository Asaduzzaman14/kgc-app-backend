/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Notification } from '../../../shared/notificationService';
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
      data.location = getUser?.upazila;
    }
  }
  console.log(data, 'datadata');

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

  const total = await ServiceModal.countDocuments(requestCondetion);
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
  const result = await ServiceModal.findById(id).populate('servicesCatagory');
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IServices,
  user: any
): Promise<IServices | null> => {
  if (user.role !== 'admin') {
    delete (paylode as Partial<IServices>).status;
  }

  const isExist = await ServiceModal.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found');
  }
  if (paylode.totalCount) {
    paylode.totalCount = isExist.totalCount + paylode.totalCount;
  }
  const result = await ServiceModal.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });

  if (
    (result &&
      result.token &&
      user.role == 'admin' &&
      paylode.status == true) ||
    paylode.status == false
  ) {
    const payload = {
      title: result!.status ? 'Service Approved' : 'Service Declined',
      body: result!.status
        ? 'আপনার সেবাটি অ্যাপ্রুভ করা হয়েছে। নির্দিষ্ট সেবাতে গিয়ে চেক করে দেখুন। ধন্যবাদ।'
        : 'আপনার সেবাটি ডিক্লাইন করা হয়েছে। অনুগ্রহ করে ঠিকঠাকভাবে সেবা যুক্ত করুন। ধন্যবাদ।',
    };

    await Notification.sendNotification(result!.token, payload);
  }

  return result;
};

const updateCountDataById = async (id: string): Promise<IServices | null> => {
  const isExist = await ServiceModal.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found');
  }
  const totalCount = isExist.totalCount + 1;

  const result = await ServiceModal.findByIdAndUpdate(
    { _id: id },
    { totalCount: totalCount },
    { new: true }
  );
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

const getDataByIdForDelete = async (id: string): Promise<IServices | null> => {
  const result = await ServiceModal.findById(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getAllDataForAdmin,
  getSingleData,
  updateDataById,
  updateCountDataById,
  deleteData,
  getMyData,
  getDataByIdForDelete,
};
