import { login, signup } from "@/controllers/user/userController";
import loginCredentialsChecker from "@/middlewares/auth/login";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginCredentialsChecker, login);

export default router;
