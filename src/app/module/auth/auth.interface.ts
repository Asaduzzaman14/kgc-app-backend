/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  name: string;
  password: string;
  role: string;
  birthdate: string;
  phone: string;
  email: string;
  upazila: string;

  lastDonateDate?: string;
  image?: string;
  bloodGroup?: string;
  isDonor?: boolean;
  status: 'active' | 'inactive';
};

export type ILogin = {
  email: string;
  password: string;
};

export type IloginResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IChagePassword = {
  oldPassword: string;
  newPassword: string;
};

export type UserModal = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'role' | 'phone' | 'email' | 'password'>>;

  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
