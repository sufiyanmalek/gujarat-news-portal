// Imports
import { Model, Schema, Types, model } from "mongoose";

// User Interface
export interface IUser {
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  registerDate: Date;
  adminId: Types.ObjectId;
  createdBy: string;
  city: string;
  area: string;
  profilePic: string;
  role: string;
}

// User Method Interface
interface IUserMethods {
  getFullName(): string;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

// User Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
  createdBy: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: true,
  },
});

// User Model
export const User = model<IUser, UserModel>("user", userSchema);
