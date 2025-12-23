import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/user.routes.js";
import captainAuthRoutes from "./routes/captain.routes.js"
import mapRoutes from "./routes/maps.routes.js"
import rideRoutes from "./routes/ride.routes.js";
import { broadcastEvent } from "./socket.js";

import cookieParser from "cookie-parser";

const app = express();


app.use(
  cors({
      origin: true, 
    credentials: true,               // 👈 cookie allow
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/users", authRoutes);
app.use("/captains", captainAuthRoutes);
app.use("/maps",mapRoutes)
app.use("/rides", rideRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Express backend 🚀");
});

// Debug: broadcast arbitrary event to all connected sockets (dev only)
app.post("/debug/broadcast", (req, res) => {
  const { event, data } = req.body || {};
  if (!event) return res.status(400).json({ success: false, message: "event required" });
  broadcastEvent(event, data);
  res.json({ success: true });
});


app.use(errorHandler);

export default app;
