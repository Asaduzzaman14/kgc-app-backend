import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { IFilterRequest } from '../servicesCatagory/servicesCatagory.interface';
import { donnorSearchableFields } from './user.constant';

const create = async (user: IUser): Promise<IUser | null> => {
  console.log(user);

  // set role
  user.role = 'user';

  const newAdmin = await User.create(user);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Register');
  }

  return newAdmin;
};

const getDonorsFromDb = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  // pagination helpers
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: donnorSearchableFields.map(field => ({
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

  const result = await User.find(requestCondetion)
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getprofile = async (id: string): Promise<IUser | null> => {
  console.log(id);

  const result = await User.findById(id);
  console.log(result);

  return result;
};

const updateDataById = async (
  id: string,
  paylode: IUser
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};
export const UserService = {
  create,
  getDonorsFromDb,
  getprofile,
  updateDataById,
};
