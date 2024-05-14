/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IServicesCatagory = {
  name: string;
  img?: string;
  description: string;
};

export type ServicesCatagoryModal = Model<
  IServicesCatagory,
  Record<string, unknown>
>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
};
