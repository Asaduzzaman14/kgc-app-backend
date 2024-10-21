/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type INotice = {
  notice: string;
  status: 'active' | 'inactive';

  productNotice: string;
  productNoticeStatus: 'active' | 'inactive';
};

export type NoticeModal = Model<INotice>;
