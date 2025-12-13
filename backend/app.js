import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Express backend 🚀");
});


app.use(errorHandler);

export default app;
