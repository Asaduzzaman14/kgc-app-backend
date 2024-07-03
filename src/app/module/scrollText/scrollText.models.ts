import { Schema, model } from 'mongoose';
import { IScrollText, ScrollTextModal } from './scrollText.interface';

const bannerSchema = new Schema<IScrollText, ScrollTextModal>(
  {
    text: {
      type: String,
      required: [true, 'Text is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const ScrollText = model<IScrollText, ScrollTextModal>(
  'scrollText',
  bannerSchema
);
