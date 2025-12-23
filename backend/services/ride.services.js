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

export const confirmRideService = async ({ rideId, captainId }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await Ride.findById(rideId)
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "pending") {
    throw new Error("Ride already confirmed");
  }

  ride.status = "confirmed";
  ride.captain = captainId;

  await ride.save();

  const populatedRide = await Ride.findById(rideId)
    .populate("user")
    .populate("captain");

  return populatedRide;
};


export const startRideService = async ({ rideId, otp, captainId }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (ride.captain._id.toString() !== captainId.toString()) {
    throw new Error("Unauthorized captain");
  }

  ride.status = "ongoing";
  await ride.save();

  return ride;
};