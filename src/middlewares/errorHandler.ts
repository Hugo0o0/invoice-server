import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import dotenv from "dotenv";
import AppError from "@/utils/AppError";
import { JsonWebTokenError } from "jsonwebtoken";
import { StatusCodes } from "@/utils/enums";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const handleZodError = (err: ZodError) => {
  let errors: any = {};

  err.issues.forEach((issue) => {
    errors[issue.path[0]] = issue.message;
  });

  return new AppError(JSON.stringify(errors), 400);
};

const handleTokenError = () => {
  return new AppError("Invalid token", StatusCodes.BAD_REQUEST);
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = err;

  if (!isProduction) {
    return res.status(StatusCodes.INTERNAL_SERVER).json({
      err: err,
      message: err.message,
      stackTrace: err.stack,
    });
  }

  if (err instanceof ZodError) {
    errors = handleZodError(err);
    return res.status(errors.statusCode).json({
      status: errors.status,
      errors: JSON.parse(errors.message),
    });
  }

  if (err instanceof JsonWebTokenError) {
    errors = handleTokenError();
    return res.status(errors.statusCode).json({
      status: errors.status,
      message: errors.message,
    });
  }

  if (errors.isOperational) {
    return res.status(errors.statusCode).json({
      status: errors.status,
      message: errors.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
