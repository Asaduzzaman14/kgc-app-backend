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
  addressDegree: string;
  location: string;
  servicesCatagory: Types.ObjectId | IServicesCatagory;
};

export type ServicesModal = Model<IServices>;

export type IFilterRequest = {
  searchTerm?: string;
  name?: string;
  servicesCatagory?: string;
};
