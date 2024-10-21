import { Schema, model } from 'mongoose';
import { INotice, NoticeModal } from './notice.interface';

const bannerSchema = new Schema<INotice, NoticeModal>(
  {
    notice: {
      type: String,
      required: [true, 'notice is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    productNotice: {
      type: String,
    },
    productNoticeStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const Notice = model<INotice, NoticeModal>('notices', bannerSchema);
