import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { customerSearchableFields } from './subCategory.constant';
import { IFilterRequest, ISubCategory } from './subCategory.interface';
import { SubCatagorys } from './subCategory.models';

const create = async (data: ISubCategory): Promise<ISubCategory | null> => {
  console.log(data);

  const result = await SubCatagorys.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Category');
  }

  return result;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubCategory[]>> => {
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

  const result = await SubCatagorys.find(requestCondetion)
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await SubCatagorys.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<ISubCategory | null> => {
  const result = await SubCatagorys.findById(id).populate('category');
  return result;
};

const updateDataById = async (
  id: string,
  paylode: ISubCategory
): Promise<ISubCategory | null> => {
  const result = await SubCatagorys.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<ISubCategory | null> => {
  // const service = await ServiceModal.deleteMany({ SubCatagorys: id });

  const result = await SubCatagorys.findByIdAndDelete(id);

  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
