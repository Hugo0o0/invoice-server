import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "@/controllers/invoice/invoiceController";
import { login, signup } from "@/controllers/user/userController";
import auth from "@/middlewares/auth/auth";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/invoices").get(auth, getInvoices).post(auth, createInvoice);

router
  .route("/invoices/:id")
  .get(auth, getInvoice)
  .put(auth, updateInvoice)
  .delete(auth, deleteInvoice);

export default router;
