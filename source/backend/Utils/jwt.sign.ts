// Imports
import jwt from "jsonwebtoken";
import { IUser } from "../Models/user.model";
import dotenv from "dotenv";

// Dotenv config
dotenv.config();

// Generate JWT Token
export const jwtTokenGenerator = (user: IUser) => {
  try {
    const token = jwt.sign(user, process.env.jwt_secret as any);
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};
