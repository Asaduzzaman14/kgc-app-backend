import { Schema, Types, model } from 'mongoose';
import { IProduct, ProductModal } from './product.interface';

const productSchema = new Schema<IProduct, ProductModal>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
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
    phone: {
      type: String,
    },

    discountPrice: {
      type: String,
    },

    isUsed: {
      type: Boolean,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },

    categoryId: {
      type: Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    subCategoryId: {
      type: Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    img: {
      type: String,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Products = model<IProduct, ProductModal>(
  'products',
  productSchema
);
