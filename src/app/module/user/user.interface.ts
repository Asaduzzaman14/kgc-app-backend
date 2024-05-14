/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
};

export type UserModal = {
  isUserExist(id: string): Promise<Pick<IUser, 'name' | 'email' | 'password'>>;

  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
