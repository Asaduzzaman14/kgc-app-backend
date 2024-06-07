import { Schema, model } from 'mongoose';
import { BannerModal, IBanner } from './banner.interface';

const bannerSchema = new Schema<IBanner, BannerModal>(
  {
    // link: {
    //   type: String,
    //   required: [true, 'link is required'],
    // },
    img: {
      type: String,
      required: [true, 'image is required'],
    },
  },
  { timestamps: true }
);

export const Banner = model<IBanner, BannerModal>('banners', bannerSchema);
