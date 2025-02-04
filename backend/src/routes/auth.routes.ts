import { Router } from "express";
import { register, login, verifyLoginOTP, logoutUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyLoginOTP);
router.post("/logout", logoutUser);

export default router;
