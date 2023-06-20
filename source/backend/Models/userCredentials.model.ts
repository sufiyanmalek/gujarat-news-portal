// Imports
import { Schema, Types, model } from "mongoose";

// User Credentials Interface
export interface IUserCreds {
  userId: Types.ObjectId;
  username: string;
  password: string;
}

// User Credentials Schema
const userCredsSchema = new Schema<IUserCreds>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// User Credential Model
export const UserCreds = model<IUserCreds>("credentials", userCredsSchema);
