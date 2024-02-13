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

export default router;
