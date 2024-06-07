/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IBanner = {
  id: string;
  // link: string;
  img: string;
};

export type BannerModal = Model<IBanner>;
