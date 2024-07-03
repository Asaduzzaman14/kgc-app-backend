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

    serviceProviderName: {
      type: String,
      required: [true, 'serviceProviderName is required'],
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
    status: {
      type: Boolean,
      default: false,
    },
    serialNo: {
      type: Number,
      required: [true, 'serialNo is required'],
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ServiceModal = model<IServices, ServicesModal>(
  'services',
  servicesCatagorysSchema
);
