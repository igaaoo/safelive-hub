import { jwtType } from "@/types/jwtType";

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
// expires in 10 years
const expiresIn = 60 * 60 * 24 * 365 * 10;

export const generateToken = (data: jwtType) => {
  const token = jwt.sign(data, secret, { expiresIn });
  return token;
};

export function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret);
    return !!decoded;
  } catch {
    return false;
  }
}

export function getUserInfos(token: string) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}
