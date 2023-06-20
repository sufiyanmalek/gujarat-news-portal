// Imports
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

// Dotenv config
dotenv.config();

// JWT Decode
export const decodeJwt = (req: any, res: Response, token: string) => {
  try {
    jwt.verify(token, process.env.jwt_secret || "asd", (err: any, data) => {
      if (err) {
        throw new Error(err);
      } else {
        req.data = data;
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
