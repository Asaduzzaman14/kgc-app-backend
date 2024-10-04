import { Model, Types } from 'mongoose';

export type IProductsCategory = {
  name: string;
  icon?: string;
  description: string;
  status: boolean;
  subcategories: Types.ObjectId[]; // Array of ObjectIds or subcategory objects
  serialNo: number;
};

export type ProductsCategoryModal = Model<
  IProductsCategory,
  Record<string, unknown>
>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
  title?: string;
};
