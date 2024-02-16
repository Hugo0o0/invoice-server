import { feedback } from "@/controllers/feedback/feedback";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "@/controllers/invoice/invoiceController";
import { login, signup } from "@/controllers/user/userController";
import hasValidToken from "@/middlewares/auth/hasValidToken";
import isCorretUser from "@/middlewares/auth/isCorrectUser";
import statusQueryExsist from "@/middlewares/statusQueryExsist";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 1 day
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 1 day).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router
  .route("/invoices")
  .get(hasValidToken, statusQueryExsist, getInvoices)
  .post(hasValidToken, createInvoice);

router
  .route("/invoices/:id")
  .get(hasValidToken, isCorretUser, getInvoice)
  .put(hasValidToken, isCorretUser, updateInvoice)
  .delete(hasValidToken, isCorretUser, deleteInvoice);

router.post("/feedback", limiter, hasValidToken, feedback);

export default router;
