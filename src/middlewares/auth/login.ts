import AppError from "@/utils/AppError";
import { RequestHandler } from "express";

const loginCredentialsChecker: RequestHandler = (req, _, next) => {
  const { user } = req.body;
  if (!user) next(new AppError("User is required", 400));
  if (!user.email) next(new AppError("Email is required", 400));
  if (!user.password) next(new AppError("Password is required", 400));

  next();
};

export default loginCredentialsChecker;
