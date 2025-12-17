import Ride from "../models/ride.models.js";
import { getFare } from "./fare.services.js";
import { generateOtp } from "./otp.services.js";

export const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: generateOtp(6),
    status: "pending",
  });

  return ride;
};