/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bycrypt_solt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  refresh_secret_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
};
