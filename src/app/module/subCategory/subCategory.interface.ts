import { Model, Types } from 'mongoose';
import { IProductsCategory } from '../productCategory/productCategory.interface';

export type ISubCategory = {
  name: string;
  img?: string;
  description: string;
  status: boolean;
  category: Types.ObjectId | IProductsCategory;
};

export type SubCategoryModal = Model<ISubCategory, Record<string, unknown>>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
};
