import { Schema, Types, model } from 'mongoose';
import {
  IProduct,
  ProductModal,
  ProductStatus,
  ProductType,
} from './product.interface';

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
      type: String,
      enum: {
        values: Object.values(ProductType),
        message:
          'Invalid value for isUsed. Allowed values are: new, used, n/a.',
      },
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
    totalCount: {
      type: Number,
      default: 0,
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
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.Pending,
    },
  },
  { timestamps: true }
);

export const Products = model<IProduct, ProductModal>(
  'products',
  productSchema
);
