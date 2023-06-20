// Imports

import { Schema, model } from "mongoose";

// OTP Interface
export interface IOtp {
  username: string;
  otp: number;
}

// OTP Schema
const otpSchema = new Schema<IOtp>({
  username: { type: String, required: true },
  otp: { type: Number, required: true },
});

// OTP Model
export const Otp = model<IOtp>("otp", otpSchema);
