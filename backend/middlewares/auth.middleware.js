import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

    } else {
      logger.warn("🚫 No token provided in request");
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info(`✅ Token verified for user ID: ${decoded.id}`);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      logger.warn(`❌ User not found for ID: ${decoded.id}`);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    logger.info(`👤 Authenticated user: ${user.email}`);
    next();
  } catch (error) {
    logger.error(`❌ Auth middleware error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};

