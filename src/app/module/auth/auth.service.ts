import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IChagePassword,
  ILogin,
  IUser,
  IloginResponse,
} from './auth.interface';
import { User } from './auth.model';
import { sendEmail } from './sendResetMail';

const create = async (user: IUser): Promise<IUser | null> => {
  console.log(user);
  if (user.isDonor == true && !user.bloodGroup) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please add your blood Group');
  }

  const isexist = await User.find({ email: user.email });
  if (isexist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  // set role
  user.role = 'user';

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Register');
  }

  return newUser;
};

const login = async (payload: ILogin): Promise<IloginResponse> => {
  const { email: userEmail, password } = payload;

  // check

  const isUserExist = await User.isUserExist(userEmail);
  console.log(isUserExist, 'isUserExist');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }
  // console.log(password, isUserExist.password);

  const _id = isUserExist._id.toString();
  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
  const { email, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role, _id },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );

  return {
    accessToken,
  };
};

const passwordChange = async (
  user: JwtPayload | null,
  paylode: IChagePassword
): Promise<void> => {
  const { oldPassword, newPassword } = paylode;

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist, 'this is user');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  isUserExist.password = newPassword;

  // update password using save method
  isUserExist.save();
};

const refreshToken = async (token: string): Promise<any> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { userId } = verifiedToken;

  // // user deleted fromd database then have refresh token
  // // checking deleted user
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { email: isUserExist.email, password: isUserExist.password },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );
  console.log(newAccessToken, 'new AccessToken');

  return {
    accessToken: newAccessToken,
  };
};

const forgotPass = async (payload: { email: string }) => {
  const user = await User.findOne(
    { email: payload.email },
    { email: 1, role: 1, name: 1 }
  );

  console.log(user);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { id: user.id },
    config.jwt_access_secret as string,
    '50m'
  );

  const resetLink: string = config.resetlink + `token=${passResetToken}`;

  console.log('profile: ', user);

  await sendEmail(
    user.email,
    `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `
  );

  // return {
  //   message: "Check your email!"
  // }
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string
) => {
  const { email, newPassword } = payload;
  const user = await User.findOne({ email }, { id: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const isVarified = await jwtHelpers.verifyToken(
    token,
    config.jwt_access_secret as string
  );
  console.log(isVarified);

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_solt_rounds)
  );
  console.log(password);

  await User.updateOne({ email }, { password });
};

export const AuthService = {
  create,
  login,
  passwordChange,
  refreshToken,
  resetPassword,
  forgotPass,
};
