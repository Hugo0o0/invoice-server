import invoice from "@/prisma-client/InvoiceClient";
import { StatusCodes } from "@/utils/enums/StatusCodes";
import tryCatch from "@/utils/tryCatch";
import { RequestHandler } from "express";

export const getInvoices: RequestHandler = tryCatch(async (req, res, next) => {
  const invoices = await invoice.getInvoices(req.body.user.id);
  return res.status(StatusCodes.OK).json({ status: "success", data: invoices });
});

export const getInvoice: RequestHandler = tryCatch(async (req, res, next) => {
  const fInvoice = await invoice.getInvoice(req.params.id);
  return res.status(StatusCodes.OK).json({ status: "success", data: fInvoice });
});

export const createInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    const newInvoice = await invoice.createInvoice(req.body, req.body.user.id);
    return res
      .status(StatusCodes.CREATED)
      .json({ status: "success", data: newInvoice });
  }
);

export const updateInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    const updatedInvoice = await invoice.updateInvoice(req.body, req.params.id);
    return res
      .status(StatusCodes.OK)
      .json({ status: "success", data: updatedInvoice });
  }
);

export const deleteInvoice: RequestHandler = tryCatch(
  async (req, res, next) => {
    await invoice.deleteInvoice(req.params.id);
    return res.status(StatusCodes.DELETE).json({ status: "success" });
  }
);
