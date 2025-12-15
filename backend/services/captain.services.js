import Captain from "../models/captain.model.js";
import {generateCaptainToken} from "../utils/generateToken.js";
import logger from "../utils/logger.js";

export const registerCaptainService = async (data) => {
  console.log("📦 Captain data received:", data);
  const { fullname, email, password, vehicle } = data;

  if (!fullname?.firstname || !fullname?.lastname || !email || !password || !vehicle) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const existingCaptain = await Captain.findOne({ email });
  if (existingCaptain) {
    const error = new Error("Captain already exists");
    error.statusCode = 400;
    throw error;
  }

  const captain = await Captain.create(data);
  logger.info(`✅ Captain registered: ${email}`);

   const token = generateCaptainToken(captain);

  return {
    id: captain._id,
    fullname: captain.fullname,
    email: captain.email,
    token
  };
};

export const loginCaptainService = async ({ email, password }) => {
  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateCaptainToken(captain);

  logger.info(`✅ Captain logged in: ${email}`);

  return {
    id: captain._id,
    fullname: captain.fullname,
    email: captain.email,
    token,
  };
};

export const logoutCaptainService = async (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return { message: "Captain logged out successfully" };
};
