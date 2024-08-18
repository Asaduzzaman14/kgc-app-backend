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
    img: {
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
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const ProductCategorys = model<IProductsCategory, ProductsCategoryModal>(
  'ProductCategory',
  productCategorySchema
);
