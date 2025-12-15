import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/user.routes.js";
import captainAuthRoutes from "./routes/captain.routes.js"
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/users", authRoutes);
app.use("/captains", captainAuthRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Express backend 🚀");
});


app.use(errorHandler);

export default app;
