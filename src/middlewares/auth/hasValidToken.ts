import AppError from "@/utils/AppError";
import TokenProcessor from "@/utils/TokenProcessor";
import { StatusCodes } from "@/utils/enums";
import tryCatch from "@/utils/tryCatch";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

const { verifyToken } = new TokenProcessor();

const hasValidToken = tryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return next(new AppError("Unauthorized", StatusCodes.UNAUTHORIZED));

  const token = authHeader.split(" ")[1];

  req.body.user = verifyToken(token);

  next();
});

export default hasValidToken;
