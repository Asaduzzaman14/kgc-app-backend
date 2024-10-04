import { Schema, Types, model } from 'mongoose';
import {
  IProductsCategory,
  ProductsCategoryModal,
} from './productCategory.interface';

const productCategorySchema = new Schema<
  IProductsCategory,
  ProductsCategoryModal
>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    subcategories: [
      {
        type: Types.ObjectId,
        ref: 'SubCategory',
        select: 0,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    serialNo: {
      type: Number,
      required: [true, 'serialNo is required'],
    },
  },
  { timestamps: true }
);

export const ProductCategorys = model<IProductsCategory, ProductsCategoryModal>(
  'ProductCategory',
  productCategorySchema
);
