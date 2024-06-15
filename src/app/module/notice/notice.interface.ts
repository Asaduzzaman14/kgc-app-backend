/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type INotice = {
  notice: string;
};

export type NoticeModal = Model<INotice>;
