export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token; // ✅ also allow reading from cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

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
