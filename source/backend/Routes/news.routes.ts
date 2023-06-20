// Imports
import express from "express";
import {
  approveNews,
  getActiveNews,
  postNews,
  rejectNews,
} from "../Controllers/news.controller";

// News Router
export const NewsRouter = express.Router();

// Post News
NewsRouter.post("/news", postNews);

// Approve News
NewsRouter.patch("/news/active", approveNews);

// Reject News
NewsRouter.patch("/news/inactive", rejectNews);

// Get Active News
NewsRouter.get("/news/active", getActiveNews);
