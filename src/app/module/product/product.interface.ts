/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';
import { IProductsCategory } from '../productCategory/productCategory.interface';
import { ISubCategory } from '../subCategory/subCategory.interface';

export enum ProductStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Approved = 'Approved',
}

export enum ProductType {
  NEW = 'New',
  USED = 'Used',
  NONE = 'N/A',
}

export type IProduct = {
  name: string;
  desc: string;
  brand: string;
  price: string;
  discountPrice: string;
  phone: string;
  isUsed: ProductType;
  totalCount: number;

  userId: Types.ObjectId | IUser;
  categoryId: Types.ObjectId | IProductsCategory;
  subCategoryId: Types.ObjectId | ISubCategory;

  img?: string;
  img2?: string;
  img3?: string;

  status: ProductStatus; // Use enum type here
};

export type ProductModal = Model<IProduct>;
