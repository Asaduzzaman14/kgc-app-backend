import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Products } from '../product/product.models';
import { SubCatagorys } from '../subCategory/subCategory.models';
import { customerSearchableFields } from './productCategory.constant';
import { IFilterRequest, IProductsCategory } from './productCategory.interface';
import { ProductCategorys } from './productCategory.models';

const create = async (
  data: IProductsCategory
): Promise<IProductsCategory | null> => {
  data.serialNo = 9999;
  const result = await ProductCategorys.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Category');
  }

  return result;
};

const getAllData = async (
  filters: IFilterRequest,
  pageinationOptions: IPaginationOptions
): Promise<IGenericResponse<IProductsCategory[]>> => {
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

  const result = await ProductCategorys.find(requestCondetion)
    .populate('subcategories')
    .sort(sortCondations);
  // .skip(skip)
  // .limit(limit);

  const total = await ProductCategorys.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IProductsCategory | null> => {
  const result = await ProductCategorys.findById(id).populate('category');
  return result;
};

const getDataById = async (id: string): Promise<IProductsCategory | null> => {
  const result = await ProductCategorys.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IProductsCategory
): Promise<IProductsCategory | null> => {
  const result = await ProductCategorys.findByIdAndUpdate(
    { _id: id },
    paylode,
    {
      new: true,
    }
  );
  return result;
};

const deleteData = async (id: string): Promise<IProductsCategory | null> => {
  const category = await ProductCategorys.findById(id).populate(
    'subcategories'
  );

  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product category not found');
  }

  const productsInCategory = await Products.countDocuments({ categoryId: id });
  console.log(productsInCategory, 'productsInCategory');

  if (productsInCategory > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot delete category: There are ${productsInCategory} products associated with this category.`
    );
  }

  await SubCatagorys.deleteMany({ category: id });

  const result = await ProductCategorys.findByIdAndDelete(id);

  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
  getDataById,
};
