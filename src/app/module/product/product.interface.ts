/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';

export type IProduct = {
  name: string;
  title: string;
  desc: string;
  brand: string;
  price: string;
  discountPrice: string;
  userId: Types.ObjectId | IUser;

  img?: string;
  img2?: string;
};

export type ProductModal = Model<IProduct>;
