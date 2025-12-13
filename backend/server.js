import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

const startServer = async () => {
  try {
    // 🗄️ Connect to DB first
    await connectDB();
    logger.info("✅ Database connected successfully.");

    // 🚀 Start server after DB connection
    server.listen(port, () => {
      logger.info(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("❌ Failed to connect to Database:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Start the setup
startServer();
