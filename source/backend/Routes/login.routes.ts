// Imports
import express from "express";
import { loginUser } from "../Controllers/login.controller";
import { verifyOtp } from "../Controllers/verifyOtp.controller";

// Login Router
export const LoginRouter = express.Router();

// Login
LoginRouter.post("/login", loginUser);

LoginRouter.post("/verifyotp", verifyOtp);
