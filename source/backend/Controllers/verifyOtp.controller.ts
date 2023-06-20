// Imports
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Otp } from "../Models/otp.model";
import { jwtTokenGenerator } from "../Utils/jwt.sign";

// Verify Otp
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { username, otp } = req.body.otpDetails;
    const { role } = req.body.user.userId;
    console.log(role);
    const user = req.body.user.userId;
    const otpDoc = await Otp.findOne({ username });
    if (otpDoc) {
      if (otpDoc.otp == otp) {
        setTimeout(async () => {
          const deleteOtps = await Otp.deleteMany({ username });
        }, 3000);
        const token = jwtTokenGenerator(user);
        res
          .status(StatusCodes.OK)
          .send({ role, token, message: "login successfull" });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).send("Incorrect Otp");
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .send("Otp has expired generate a new one");
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
