// Imports
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser, User } from "../Models/user.model";
import { joiValidateUser } from "../Utils/user.joiValidator";
import { passwordHasher } from "../Utils/passwordHasher";
import { generateUsername } from "../Utils/generateUsername";
import { UserCreds } from "../Models/userCredentials.model";
import { sendNewUserCreds } from "../Utils/sendUserCreds.nodemailer";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    // User Validation with Joi
    const validation = joiValidateUser(user);
    // When Validation fails
    if (validation?.message) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "User Data failed the validation check",
        error: validation.message,
      });
    } else {
      // Search User with similar email
      const userExists = await User.findOne({ email: user.email });
      if (userExists) {
        res
          .status(StatusCodes.CONFLICT)
          .send("User with this Email Already Exists!");
      } else {
        const newUser = new User(user);
        await newUser.save();

        // Generates Random Username From Email
        const username: string = generateUsername(newUser.email);

        // Generates 6 digit Password
        const password = Math.floor(Math.random() * 900000 + 100000).toString();

        // Generates Hashed Password
        const hashedPassword = await passwordHasher(password);

        // Create Doc in credentials collection
        const userCreds = new UserCreds({
          userId: newUser._id,
          password: hashedPassword,
          username: username,
        });
        await userCreds.save();
        // Send User Creds in Email to User
        await sendNewUserCreds(user.email, { username, password });
        res.status(StatusCodes.OK).send("user Registered");
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
