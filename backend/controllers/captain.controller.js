import { asyncHandler } from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { registerCaptainService,loginCaptainService,logoutCaptainService } from "../services/captain.services.js";

export const registerCaptain = asyncHandler(async (req, res) => {
  const captain = await registerCaptainService(req.body);

  res.cookie("token", captain.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.info(`🧑‍✈️ Captain registered: ${captain.email}`);

  res.status(201).json({
    success: true,
    message: "Captain registered successfully",
    captain: {
      id: captain.id,
      fullname: captain.fullname,
      email: captain.email,
      role: captain.role,        // ✅ role included here
    },
    captainToken: captain.token,
    role: captain.role           // ✅ also send top-level role
  });
});


export const loginCaptain = asyncHandler(async (req, res) => {
  const captain = await loginCaptainService(req.body);

  res.cookie("token", captain.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.info(`🧑‍✈️ Captain logged in: ${captain.email}`);

  res.status(200).json({
    success: true,
    message: "Captain logged in successfully",
    captain: {
      id: captain.id,
      fullname: captain.fullname,
      email: captain.email,
      role: captain.role,        // ✅ include role in captain object
    },
    captainToken: captain.token, // ✅ include token separately
    role: captain.role           // ✅ send top-level role
  });
});


export const logoutCaptain = asyncHandler(async (req, res) => {
  const result = await logoutCaptainService(res);
  logger.info(`👋 Captain logged out`);

  res.status(200).json({
    success: true,
    message: result.message,
    role: result.role,
  });
});

