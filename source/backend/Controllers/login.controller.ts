// Imports

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserCreds } from "../Models/userCredentials.model";
import { comparePassword } from "../Utils/comparePassword";
import { Otp } from "../Models/otp.model";
import { sendOtp } from "../Utils/sendOtp.nodeMailer";

//Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: any = await UserCreds.findOne({ username: username }).populate(
      "userId"
    );
    const valid = await comparePassword(password, user?.password as string);
    if (user && valid) {
      console.log(user);
      const otp = Math.floor(Math.random() * 900000 + 100000);
      // Delete all previous otps of current user
      const deleteAllOtps = await Otp.deleteMany({ username: username });
      const newOtp = new Otp({
        username: user?.username,
        otp: otp,
      });
      await newOtp.save();
      // Delete Otp after 30 secs(expire)
      setTimeout(async () => {
        const deleteOtp = await Otp.findOneAndDelete({ username: username });
      }, 45000);
      sendOtp(user.userId.email, otp);
      res.status(StatusCodes.OK).json({
        message: "Otp has been sent to your email",
        user: user,
      });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Incorrect username or password!");
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
