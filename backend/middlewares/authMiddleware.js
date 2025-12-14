import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import Captain from "../models/captain.model.js";
import logger from "../utils/logger.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
    }

    if (!token) {
      logger.warn("🚫 No token provided in request");
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      logger.warn("🚫 Blacklisted token used");
      return res.status(401).json({
        success: false,
        message: "Token is blacklisted. Please log in again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    const captain = await Captain.findById(decoded.id).select("-password");

    if (!user && !captain) {
      logger.warn(`❌ No account found for ID: ${decoded.id}`);
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (user) {
      req.user = user;
      logger.info(`👤 Authenticated User: ${user.email}`);
    } else if (captain) {
      req.captain = captain;
      logger.info(`🧑‍✈️ Authenticated Captain: ${captain.email}`);
    }

    next();
  } catch (error) {
    logger.error(`❌ Auth middleware error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};
