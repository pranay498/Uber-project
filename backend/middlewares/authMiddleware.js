import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import Captain from "../models/captain.model.js";
import BlacklistToken from "../models/blacklistToken.model.js"

export const authMiddleware = asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization;

  const token =
    authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token;

  if (!token) {
    const error = new Error("No token provided");
    error.statusCode = 401;
    throw error;
  }

  // 🔒 Check blacklist
  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    const error = new Error("Token is blacklisted");
    error.statusCode = 401;
    throw error;
  }

  // 🔐 Verify JWT
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let account = null;

  if (decoded.role === "user") {
    account = await User.findById(decoded.id);
  } 
  else if (decoded.role === "captain") {
    account = await Captain.findById(decoded.id);
  }

  if (!account) {
    const error = new Error("Account not found");
    error.statusCode = 404;
    throw error;
  }

  req.user = account;       
  req.role = decoded.role;  

  next();
});
