/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  name: string;
  password: string;
  role: string;
  phone: string;
  email: string;
  upazila: string;

  lastDonateDate?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // All possible blood groups
  isDonor?: boolean;
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
