import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerCaptainSchema,captainLoginSchema } from "../validation/captainValidation.js";
import { logoutCaptain, registerCaptain ,loginCaptain } from "../controllers/captain.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",validate(registerCaptainSchema),registerCaptain);

router.post("/login",validate(captainLoginSchema),loginCaptain);

router.post("/logout",authMiddleware, logoutCaptain)

export default router;