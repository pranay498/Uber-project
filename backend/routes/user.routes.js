import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema} from "../validation/userValidaton.js";
import { registerUser,loginUser, getProfile } from "../controllers/user.controller.js";
import { loginSchema } from "../validation/userValidaton.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/profile",protectRoute, getProfile)

export default router;
