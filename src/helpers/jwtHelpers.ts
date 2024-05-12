import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  paylode: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(paylode, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const createResetToken = (
  payload: any,
  secret: string,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime,
  });
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  createResetToken,
};
