/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type INotice = {
  notice: string;
  status: 'active' | 'inactive';
};

export type NoticeModal = Model<INotice>;
