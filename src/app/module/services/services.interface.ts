/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';
import { IServicesCatagory } from '../servicesCatagory/servicesCatagory.interface';

export type IServices = {
  id: string;
  name: string;
  img?: string;
  description: string;
  phone: string;
  servicesCatagory: Types.ObjectId | IServicesCatagory;
  user: Types.ObjectId | IUser;
};

export type ServicesModal = Model<IServices>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
  servicesCatagory?: string;
};
