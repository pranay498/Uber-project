import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import Captain from "../models/captain.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account = null;
    if (decoded.role === "user") {
      account = await User.findById(decoded.id);
    } else if (decoded.role === "captain") {
      account = await Captain.findById(decoded.id);
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    req.user = account;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
