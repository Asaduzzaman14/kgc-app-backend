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
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    addressDegree: {
      type: String,
      required: [true, 'addressDegree is required'],
    },

    location: {
      type: String,
      required: [true, 'location is required'],
    },

    servicesCatagory: {
      type: Types.ObjectId,
      ref: 'ServicesCatagory',
      required: true,
    },
  },
  { timestamps: true }
);

export const ServiceModal = model<IServices, ServicesModal>(
  'services',
  servicesCatagorysSchema
);
