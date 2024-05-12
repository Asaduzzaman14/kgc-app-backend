import { Schema, Types, model } from 'mongoose';
import { IServices, ServicesModal } from './services.interface';

const servicesCatagorysSchema = new Schema<IServices, ServicesModal>(
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
    price: {
      type: String,
      required: [true, 'price is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    catagoryService: {
      type: Types.ObjectId,
      ref: 'servicesCatagorys',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = model<IServices, ServicesModal>(
  'services',
  servicesCatagorysSchema
);
