import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModal } from './auth.interface';

const adminSchema = new Schema<IUser, UserModal>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    role: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    lastDonateDate: {
      type: String,
    },
    upazila: {
      type: String,
      required: [true, 'upazila is required'],
    },
    birthdate: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://alppetro.co.id/dist/assets/images/default.jpg',
    },
    bloodGroup: {
      type: String,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpiration: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

adminSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'role' | 'phone' | 'email' | 'password'> | null> {
  const user = await User.findOne(
    { email },
    { email: 1, role: 1, password: 1 }
  );

  return user;
};

adminSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

// hashing password before save document
// user.create() // user.save()
adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_solt_rounds)
  );
  console.log(user);

  next();
});

export const User = model<IUser, UserModal>('users', adminSchema);
