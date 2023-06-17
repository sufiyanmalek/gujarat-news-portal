// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";

// Dotenv config
dotenv.config();

// Database Connection
export const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
      console.log("Connect to DB Successfully");
    })
    .catch((e) => {
      console.log(e);
    });
};
