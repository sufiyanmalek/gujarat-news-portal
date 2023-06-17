// Imports
import { Schema, Types, model } from "mongoose";

// News Interface
export interface INews {
  title: string;
  desc: string;
  reporterName: string;
  reporterId: Types.ObjectId;
  publishedAt: Date;
  status: string;
  category: string;
  image: string;
  video: string;
}

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

// News Schema
const newsSchema = new Schema<INews>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  reporterName: {
    type: String,
    required: true,
  },
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Pending"],
    required: true,
  },
  category: {
    type: String,
    enum: Categories,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

// News Model
export const News = model<INews>("news", newsSchema);
