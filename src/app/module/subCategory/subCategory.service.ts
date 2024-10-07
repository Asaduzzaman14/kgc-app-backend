import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ProductCategorys } from '../productCategory/productCategory.models';
import { customerSearchableFields } from './subCategory.constant';
import { IFilterRequest, ISubCategory } from './subCategory.interface';
import { SubCatagorys } from './subCategory.models';

const create = async (data: ISubCategory): Promise<ISubCategory | null> => {
  // Step 1: Create the SubCategory
  const subCategory = await SubCatagorys.create(data);
  console.log(subCategory);

  if (!subCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add SubCategory');
  }

  // Step 2: Add the SubCategory ID to the Category's subcategories array
  const category = await ProductCategorys.findById(subCategory.category);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  category.subcategories.push(subCategory._id);
  await category.save();

  return subCategory;
};
const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubCategory[]>> => {
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

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await SubCatagorys.find(requestCondetion)
    .populate('category')
    .sort(sortCondations);
  // .skip(skip)
  // .limit(limit);

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
