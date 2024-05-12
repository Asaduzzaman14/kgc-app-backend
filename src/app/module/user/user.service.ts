import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';

const create = async (user: IUser): Promise<IUser | null> => {
  console.log(user);

  // set role
  user.role = 'user';

  const newAdmin = await User.create(user);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Register');
  }

  return newAdmin;
};

export const UserService = {
  create,
};
