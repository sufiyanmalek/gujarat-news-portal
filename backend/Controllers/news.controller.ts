// Imports
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INews } from "../Models/news.model";

// Create News
export const postNews = async (req: Request, res: Response) => {
  let newsDetails: INews = JSON.parse(req.body.newsData);
  console.log(newsDetails);
  const image = req.files?.Image;
  const video = req.files?.Video;

  try {
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
