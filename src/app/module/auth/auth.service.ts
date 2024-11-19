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
import { resetPasswordTemplate } from './emailTemplate';
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
    { email: 1, name: 1 }
  );

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  const passResetToken = Math.floor(10000 + Math.random() * 90000).toString();

  const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes

  user.resetToken = passResetToken;
  user.resetTokenExpiration = expirationTime;

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        resetToken: passResetToken,
        resetTokenExpiration: expirationTime,
      },
    }
  );
  await sendEmail(
    user.email,
    `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Your password reset token is: <strong>${passResetToken}</strong></p>
        <p>This token is valid for 15 minutes.</p>
        <p>Thank you</p>
      </div>
    `
  );

  // Generate email template
  const emailTemplate = resetPasswordTemplate(user.name, passResetToken);

  // Send email
  await sendEmail(user.email, emailTemplate);

  return { message: 'Password reset token sent successfully' };
};

const resetPassword = async (payload: {
  code: string;
  newPassword: string;
}) => {
  console.log(payload);

  const { code, newPassword } = payload;

  const token = await User.findOne({ resetToken: code }).select(
    '+email, +resetToken +resetTokenExpiration'
  );

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invaid token!');
  }

  // Check if the token is expired
  if (new Date() > new Date(token.resetTokenExpiration)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reset token has expired');
  }

  // Check if the token matches the stored reset token
  if (token.resetToken != code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid or expired reset token'
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_solt_rounds)
  );

  // Update the user password and clear the reset token and expiration
  await User.updateOne(
    { email: token.email },
    {
      $set: {
        password: hashedPassword, // Update password
        resetToken: undefined, // Clear reset token
        resetTokenExpiration: undefined, // Clear reset token expiration
      },
    }
  );

  return { message: 'Password has been reset successfully' };
};

export const AuthService = {
  create,
  login,
  passwordChange,
  refreshToken,
  resetPassword,
  forgotPass,
};
