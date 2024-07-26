import { Model } from 'mongoose';

export type IProductsCategory = {
  name: string;
  img?: string;
  description: string;
  status: boolean;
};

export type ProductsCategoryModal = Model<
  IProductsCategory,
  Record<string, unknown>
>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
};
