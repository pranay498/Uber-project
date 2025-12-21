import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUserService } from "../services/user.services.js";
import { loginUserService } from "../services/user.services.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import logger from "../utils/logger.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const result = await registerUserService({ fullname, email, password });

  res.status(201).cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
    success: true,
    message: "User registered successfully",
    role: "user",
    user: {
      id: result.user._id,          // ✅ FIX
      fullname: result.user.fullname,
      email: result.user.email,
    },
    token: result.token             // ✅ top-level token
  });
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUserService({ email, password });

  res.status(200).cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
    success: true,
    message: "Login successful",
    role: "user",
    user: {
      id: result.user._id,          // ✅ FIX
      fullname: result.user.fullname,
      email: result.user.email,
    },
    token: result.token
  });
});



export const logoutUser = asyncHandler(async (req, res) => {
const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("No token provided during logout");
    res.status(401);
    throw new Error("No token provided");
  }


  await BlacklistToken.create({ token });
  logger.info("Token blacklisted successfully");

  
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });


  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    role: req.role || "user", // dynamic role
  });

  logger.info("👋 User logged out successfully");
});


export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    role: "user", // ✅ added role for consistent response
    user: req.user,
  });
});
