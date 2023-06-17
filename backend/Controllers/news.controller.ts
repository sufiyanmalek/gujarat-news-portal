// Imports
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INews } from "../Models/news.model";
import { uploadOnS3 } from "../Utils/putObjectAws";
import { UploadedFile } from "express-fileupload";

// Create News
export const postNews = async (req: Request, res: Response) => {
  let newsDetails: INews = JSON.parse(req.body.newsData);
  const image = req.files?.Image as UploadedFile;
  const video = req.files?.Video as UploadedFile;
  const imageUrl = await uploadOnS3(image?.name, image?.data);
  const videoUrl = await uploadOnS3(video?.name, video?.data);
  newsDetails.image = imageUrl!;
  newsDetails.video = videoUrl!;
  console.log(newsDetails);

  try {
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
