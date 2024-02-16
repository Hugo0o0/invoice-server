import tryCatch from "@/utils/tryCatch";
import nodemailer from "nodemailer";
import { RequestHandler } from "express";
import AppError from "@/utils/AppError";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const feedback: RequestHandler = tryCatch(async (req, res, next) => {
  const { email, reason } = req.body;
  if (!email || !reason)
    return next(new AppError("Please provide email and reason", 400));
  const mailOptions = {
    from: email,
    to: process.env.MAIL,
    subject: "Feedback",
    text: `Email: ${email}\nMessage: ${reason}`,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({ status: "success", message: "Feedback sent" });
});
