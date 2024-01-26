import express from "express";
import dotenv from "dotenv";
import router from "@/routes/route";
import errorHandler from "@/middlewares/errorHandler";
import AppError from "./utils/AppError";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
