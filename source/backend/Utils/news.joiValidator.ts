// Imports
import Joi from "joi";
import { INews } from "../Models/news.model";

// Category Enums
const Categories = [
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
  "World News",
  "Education",
  "Environment",
  "Lifestyle",
  "Arts and Culture",
  "Travel",
  "Opinion/Editorial",
  "Finance",
  "Crime",
  "Weather",
  "Religion",
  "Fashion",
  "Food and Drink",
];

export const joiValidateNews = (news: INews) => {
  // News Validator Object
  const newsObj = Joi.object<INews>({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    reporterName: Joi.string().required(),
    reporterId: Joi.string().required(),
    category: Joi.string()
      .valid(...Categories)
      .required(),
    image: Joi.string().required(),
    video: Joi.string().required(),
  });

  // News Validation Function
  const validation = newsObj.validate(news);
  return validation.error?.details[0];
};
