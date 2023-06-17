// Imports
import express from "express";
import { postNews } from "../Controllers/news.controller";

// News Router
export const NewsRouter = express.Router();

// Post News
NewsRouter.post("/news", postNews);
