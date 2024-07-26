import { Schema, Types, model } from 'mongoose';
import { ISubCategory, SubCategoryModal } from './subCategory.interface';

const subCatagorysSchema = new Schema<ISubCategory, SubCategoryModal>(
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
    status: {
      type: Boolean,
      default: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'productCategory',
      required: true,
    },
  },
  { timestamps: true }
);

export const SubCatagorys = model<ISubCategory, SubCategoryModal>(
  'subCatagorys',
  subCatagorysSchema
);
