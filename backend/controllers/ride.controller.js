import { asyncHandler } from "../utils/asyncHandler.js";
import { createRide } from "../services/ride.services.js";
import { getFare } from "../services/fare.services.js";

export const createRideController = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found",
    });
  }

  const { pickup, destination, vehicleType } = req.body;
  const user = req.user._id;

  const ride = await createRide({
    user,
    pickup,
    destination,
    vehicleType,
  });

  res.status(201).json({
    success: true,
    data: ride,
  });
});



export const getFareController = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.query;

  const fare = await getFare(pickup, destination);

  res.status(200).json({
    success: true,
    data: fare,
  });
});