// Imports
import Joi from "joi";
import { IUser } from "../Models/user.model";

export const joiValidateUser = (user: IUser) => {
  // User Validator Object
  const userObject = Joi.object<IUser>({
    fullName: {
      firstName: Joi.string().required().min(3).max(20),
      middleName: Joi.string().required().min(3).max(20),
      lastName: Joi.string().required().min(3).max(20),
    },
    email: Joi.string().email().required(),
    registerDate: Joi.date().optional(),
    adminId: Joi.string().required(),
    createdBy: Joi.string().required(),
    city: Joi.string().required(),
    area: Joi.string().required(),
    profilePic: Joi.string().required(),
    role: Joi.string().valid("Admin", "User").required(),
  });

  // User Validation Function
  const validation = userObject.validate(user);
  return validation.error?.details[0];
};
