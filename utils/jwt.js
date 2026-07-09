import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || process.env.jwt_secret;
  const expiresIn = process.env.JWT_EXPIRES_IN || process.env.jwt_expires_in;
  return jwt.sign({ id: userId, role }, secret, {
    expiresIn,
  });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || process.env.jwt_secret;
  return jwt.verify(token, secret);
};
