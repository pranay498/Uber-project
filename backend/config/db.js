import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing from .env file");
    }

    const conn = await mongoose.connect(uri);

    logger.info(`🗄️ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ Error connecting to DB: ${error.message}`);
    throw error; // server.js ko batane ke liye
  }
};

export default connectDB;
