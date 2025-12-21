import { asyncHandler } from "../utils/asyncHandler.js";
import { createRide } from "../services/ride.services.js";
import { getFare } from "../services/fare.services.js";
import { getAddressCoordinate } from "../services/maps.services.js";
import { getCaptainsInTheRadius } from "../services/maps.services.js";
import Ride from "../models/ride.models.js";

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

  // const pickupCoordinates = await getAddressCoordinate(pickup);

  // console.log( pickupCoordinates)

  // const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

  // console.log(captainsInRadius)

  // ride.otp = ""


  // captainsInRadius.map(captain => {

  //   sendMessageToSocketId(captain.socketId, {
  //     event: 'new-ride',
  //     data: rideWithUser
  //   })

  // })


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