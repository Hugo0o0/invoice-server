import invoice from "@/prisma-client/InvoiceClient";
import AppError from "@/utils/AppError";
import { StatusCodes } from "@/utils/enums/StatusCodes";
import tryCatch from "@/utils/tryCatch";

const isCorretUser = tryCatch(async (req, res, next) => {
  const { id } = req.body.user;

  const fInvoice = await invoice.getInvoiceWithUser(req.params.id);

  if (fInvoice?.userId !== id)
    return next(new AppError("Unauthorized", StatusCodes.UNAUTHORIZED));

  next();
});

export default isCorretUser;
