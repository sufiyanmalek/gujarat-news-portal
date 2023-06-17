// Imports
import express from "express";
import dotenv from "dotenv";
import { UserRouter } from "./Routes/user.routes";
import { NewsRouter } from "./Routes/news.routes";
import { connectDB } from "./Config/dbConnection";
import fileUpload from "express-fileupload";

// Dotenv config
dotenv.config();

// App Initiations
const app = express();

// Connect To DB
connectDB();

// Express middlewares
app.use(express.json());
app.use(fileUpload());

// User Router
app.use(UserRouter);

// News Router
app.use(NewsRouter);

// Ports
const PORT = process.env.PORT || 8000;

// Listen to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
