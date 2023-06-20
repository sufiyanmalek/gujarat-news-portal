// Imports
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INews, News } from "../Models/news.model";
import { uploadOnS3 } from "../Utils/putObjectAws";
import { UploadedFile } from "express-fileupload";
import { joiValidateNews } from "../Utils/news.joiValidator";

// Create News
export const postNews = async (req: Request, res: Response) => {
  try {
    let news: INews = JSON.parse(req.body.newsData);
    const image = req.files?.Image as UploadedFile;
    const video = req.files?.Video as UploadedFile;
    const imageUrl = await uploadOnS3(image?.name, image?.data);
    const videoUrl = await uploadOnS3(video?.name, video?.data);
    news.image = imageUrl!;
    news.video = videoUrl!;
    console.log(news);
    // News Validation with Joi
    const validation = joiValidateNews(news);
    console.log(validation);
    // When Validation fails
    if (validation?.message) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "Your News failed the validation check",
        error: validation.message,
      });
    } else {
      const newNews = new News(news);
      await newNews.save();
      res
        .status(StatusCodes.OK)
        .send("News has been posted just wait for Admin Approval");
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

// Approve News
export const approveNews = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    console.log(id);
    const approvedNews = await News.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Active",
        },
      },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).send(approvedNews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

// Reject News
export const rejectNews = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    console.log(id);
    const rejectedNews = await News.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Inactive",
        },
      },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).send(rejectedNews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

// Send Only Active news
export const getActiveNews = async (req: Request, res: Response) => {
  try {
    const news: INews[] = await News.find({ status: "Active" });
    res.status(StatusCodes.OK).send(news);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
