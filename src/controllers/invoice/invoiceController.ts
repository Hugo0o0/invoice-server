import tryCatch from "@/utils/tryCatch";
import { RequestHandler } from "express";

export const getInvoices: RequestHandler = tryCatch(async (req, res, next) => {
  return res.status(200).json({ message: req.body.user });
});

export const getInvoice: RequestHandler = tryCatch(async (req, res, next) => {
  return res.status(200).json({ message: "get invoice" });
});

export const createInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    return res.status(200).json({ message: "create invoice" });
  }
);

export const updateInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    return res.status(200).json({ message: "update invoice" });
  }
);

export const deleteInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    return res.status(200).json({ message: "delete invoice" });
  }
);
