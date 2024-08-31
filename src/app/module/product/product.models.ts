import { Schema, model } from 'mongoose';
import { IProduct, ProductModal } from './product.interface';

const productSchema = new Schema<IProduct, ProductModal>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    brand: {
      type: String,
      required: [true, 'title is required'],
    },
    desc: {
      type: String,
      required: [true, 'name is required'],
    },
    price: {
      type: String,
      required: [true, 'name is required'],
    },
    discountPrice: {
      type: String,
    },
    img: {
      type: String,
    },
    img2: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Products = model<IProduct, ProductModal>(
  'products',
  productSchema
);
