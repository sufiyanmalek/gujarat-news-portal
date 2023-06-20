// Imports
import express from "express";
import { createUser } from "../Controllers/user.controller";
import { decodeJwt } from "../Middlewares/jwt.decode";

// User Router
export const UserRouter = express.Router();

// Create User
UserRouter.post("/user", createUser);
