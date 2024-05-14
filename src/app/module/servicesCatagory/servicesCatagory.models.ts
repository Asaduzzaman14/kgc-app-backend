import { Schema, model } from 'mongoose';
import {
  IServicesCatagory,
  ServicesCatagoryModal,
} from './servicesCatagory.interface';

const servicesCatagorysSchema = new Schema<
  IServicesCatagory,
  ServicesCatagoryModal
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
  },
  { timestamps: true }
);

export const ServicesCatagory = model<IServicesCatagory, ServicesCatagoryModal>(
  'ServicesCatagory',
  servicesCatagorysSchema
);
