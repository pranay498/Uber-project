import { asyncHandler } from "../utils/asyncHandler.js";
import { createRide,confirmRideService ,startRideService } from "../services/ride.services.js";
import { getFare } from "../services/fare.services.js";
import {getAddressCoordinate, getCaptainsInTheRadius,} from "../services/maps.services.js";
import Ride from "../models/ride.models.js";
import { sendMessageToSocketId } from "../socket.js";

export const createRideController = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { pickup, destination, vehicleType } = req.body;
  const userId = req.user.id || req.user._id;

  // 1️⃣ Create ride in DB
  const ride = await createRide({
    user: userId,
    pickup,
    destination,
    vehicleType,
  });

  // 2️⃣ Send HTTP response (ONLY ONCE)
  res.status(201).json({
    success: true,
    data: ride,
  });


  const pickupCoordinates = await getAddressCoordinate(pickup);
  console.log("📍 Pickup coordinates:", pickupCoordinates);

  // 4️⃣ Find nearby captains (2 km radius)
  const captainsInRadius = await getCaptainsInTheRadius(
    pickupCoordinates.ltd,
    pickupCoordinates.lng,
    2
  );

  console.log("🚕 Captains nearby:", captainsInRadius.length);

  if (!Array.isArray(captainsInRadius) || captainsInRadius.length === 0) {
    console.log("❌ No captains nearby");
    return;
  }
  

  ride.otp=""
  
  const rideWithUser = await Ride.findById(ride._id).populate("user");

  // 6️⃣ Emit socket event to captains
  captainsInRadius.forEach((captain) => {
    if (!captain.socketId) return;

    sendMessageToSocketId(captain.socketId, {
      event: "new-ride",
      data: rideWithUser,
    });
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

export const confirmRideController = asyncHandler(async (req, res) => {
  if (req.role !== "captain") {
    return res.status(403).json({
      success: false,
      message: "Only captain can confirm ride",
    });
  }

  const { rideId } = req.body;
  const captainId = req.user._id || req.user.id;

  const ride = await confirmRideService({
    rideId,
    captainId,
  });

  if (ride?.user?.socketId) {
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
  }

  res.status(200).json({
    success: true,
    data: ride,
  });
});

export const startRide = asyncHandler(async (req, res) => {

  // ✅ 2. Extract data
  const { rideId, otp } = req.body;
  const captainId = req.user._id;

  const ride = await startRideService({
    rideId,
    otp,
    captainId,
  });

  res.status(200).json({
    success: true,
    message: "Ride started successfully",
    data: ride,
  });
});
