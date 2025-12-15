import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema,loginSchema } from "../validation/userValidaton.js";
import { registerUser,loginUser, getProfile, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/profile",authMiddleware, getProfile)

router.post("/logout",authMiddleware , logoutUser);

export default router;
