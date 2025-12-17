import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { getCoordinatesController,getDistanceTimeController,getAutoCompleteSuggestionsController } from "../controllers/map.controller.js"
import { validateQuery } from "../middlewares/validate.js"
import { getCoordinatesSchema,distanceTimeQuerySchema ,autoCompleteQuerySchema} from "../middlewares/mapValidator.js"

const router = express.Router()

router.get(
    "/get-coordinate",
     authMiddleware,
    validateQuery(getCoordinatesSchema),
    getCoordinatesController
);

router.get(
  "/get-distance-time",
   authMiddleware,
  validateQuery(distanceTimeQuerySchema),
  getDistanceTimeController
);

router.get(
  "/get-suggestions",
   authMiddleware,
  validateQuery(autoCompleteQuerySchema),
  getAutoCompleteSuggestionsController
);



export default router