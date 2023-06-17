// Imports
import express from "express";
import { createUser } from "../Controllers/user.controller";

// User Router
export const UserRouter = express.Router();

// Create User
UserRouter.post("/user", createUser);
