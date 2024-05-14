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
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    servicesCatagory: {
      type: Types.ObjectId,
      ref: 'ServicesCatagory',
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
