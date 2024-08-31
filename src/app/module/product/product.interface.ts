/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  title: string;
  desc: string;
  brand: string;
  price: string;
  discountPrice: string;

  img?: string;
  img2?: string;
};

export type ProductModal = Model<IProduct>;
