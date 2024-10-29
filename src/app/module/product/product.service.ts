import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFilterRequest } from '../productCategory/productCategory.interface';
import { customerSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Products } from './product.models';
import { deleteUserImage } from './product.utils';

const create = async (data: IProduct): Promise<IProduct | null> => {
  if (!data.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user Token not found');
  }
  if (data.price < data.discountPrice) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Discount price should be less then price'
    );
  }

  const result = await Products.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to uplode Product');
  }

  return result;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  // pagination helpers
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const { searchTerm, ...filtersData } = filters;
  console.log(searchTerm);

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
  const requestCondition =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await Products.find(requestCondition)
    .populate('userId')
    .populate({
      path: 'categoryId',
      select: '-subcategories',
    })
    .populate('subCategoryId')
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await Products.countDocuments(requestCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findById(id)
    .populate('userId')
    .populate({
      path: 'categoryId',
      select: '-subcategories',
    })
    .populate('subCategoryId');
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

  if (existingRecord) {
    const oldImageUrl = existingRecord?.img3;
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

const updateCountDataById = async (id: string): Promise<any | null> => {
  const isExist = await Products.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found');
  }
  const totalCount = isExist.totalCount + 1;

  const result = await Products.findByIdAndUpdate(
    { _id: id },
    { totalCount: totalCount }
  );

  return result;
};
// test

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
  //
  getMyAlldata,
  getById,
  updateCountDataById,
};
