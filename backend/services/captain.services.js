import Captain from "../models/captain.model.js";
import {generateCaptainToken} from "../utils/generateToken.js";
import logger from "../utils/logger.js";

export const registerCaptainService = async (data) => {
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
    token,
    role: "captain"              // ✅ role added here
  };
};

export const loginCaptainService = async ({ email, password }) => {
  const captain = await Captain.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!captain) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateCaptainToken(captain._id);

  return {
    id: captain._id,
    fullname: captain.fullname,
    email: captain.email,
    role: "captain",
    token,
  };
};

export const logoutCaptainService = async (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return { message: "Captain logged out successfully", role: "captain" };
};
