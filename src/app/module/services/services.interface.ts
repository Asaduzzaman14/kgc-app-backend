/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IServicesCatagory } from '../servicesCatagory/servicesCatagory.interface';

export type IServices = {
  id: string;
  name: string;
  img?: string;
  description: string;
  phone: string;
  email: string;
  serviceProviderName: string;
  addressDegree: string;
  location: string;
  status: boolean;
  serialNo: number;

  count: number;
  totalCount: number;

  premium: boolean;
  servicesCatagory: Types.ObjectId | IServicesCatagory;
};

export type ServicesModal = Model<IServices>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
  servicesCatagory?: string;
};
