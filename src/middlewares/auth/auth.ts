import AppError from "@/utils/AppError";
import TokenProcessor from "@/utils/TokenProcessor";
import tryCatch from "@/utils/tryCatch";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

const { verifyToken } = new TokenProcessor();

interface User extends Request {
  user: JwtPayload;
  ok: boolean;
}

const auth = tryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new AppError("Unauthorized", 401));

  const token = authHeader.split(" ")[1];

  req.body.user = verifyToken(token);

  next();
});

export default auth;
