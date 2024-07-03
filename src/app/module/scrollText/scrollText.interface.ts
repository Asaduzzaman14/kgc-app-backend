/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IScrollText = {
  text: string;
  status: 'active' | 'inactive';
};

export type ScrollTextModal = Model<IScrollText>;
