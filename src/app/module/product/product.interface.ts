/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';
import { IProductsCategory } from '../productCategory/productCategory.interface';
import { ISubCategory } from '../subCategory/subCategory.interface';

export type IProduct = {
  name: string;
  title: string;
  desc: string;
  brand: string;
  price: string;
  discountPrice: string;
  userId: Types.ObjectId | IUser;
  categoryId: Types.ObjectId | IProductsCategory;
  subCategoryId: Types.ObjectId | ISubCategory;

  img?: string;
  img2?: string;
  img3?: string;
};

export type ProductModal = Model<IProduct>;
