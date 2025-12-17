import express from "express";
import { createRideController, getFareController , } from "../controllers/ride.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate, validateMap, } from "../middlewares/validate.js";
import { createRideSchema,getFareSchema  } from "../validation/rideValidation.js";

const router = express.Router();

router.post(
  "/create",   
  authMiddleware,         // 🔐 JWT → req.user
  validate(createRideSchema),     // ✅ Joi validation
  createRideController           
);

router.get(
  "/get-fare",
  authMiddleware,
  validateMap(getFareSchema, "query"),
  getFareController
);



export default router;
