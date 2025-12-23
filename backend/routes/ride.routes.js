import express from "express";
import { createRideController, getFareController , confirmRideController, startRide} from "../controllers/ride.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate, validateMap,validateBody } from "../middlewares/validate.js";
import { createRideSchema,getFareSchema,confirmRideSchema, startRideSchema  } from "../validation/rideValidation.js";

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


router.post(
  "/confirm",
  authMiddleware,              // captain token required
  validateBody(confirmRideSchema),
  confirmRideController
);

router.get("/start-ride",authMiddleware,validateBody(startRideSchema),startRide)



export default router;
