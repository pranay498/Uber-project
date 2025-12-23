import { Server } from "socket.io";
import { asyncHandler } from "./utils/asyncHandler.js";
import User from "./models/user.models.js";
import Captain from "./models/captain.model.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on(
    "connection",
    asyncHandler(async (socket) => {
      console.log("Client connected:",socket.id);

      socket.on(
        "join",
        asyncHandler(async (data) => {
          const { userId, userType } = data;

          console.log(`User ${userId} received from ${userType}`)

          if (userType === "user") {
            await User.findByIdAndUpdate(userId, {
              socketId: socket.id,
            });
          } else if (userType === "captain") {
            await Captain.findByIdAndUpdate(userId, {
              socketId: socket.id,
            });
          }
        })
      );

      socket.on(
        "update-location-captain",
        asyncHandler(async (data) => {
          console.log("📍 LOCATION EVENT DATA:", data);

          const { userId, location } = data || {};

          if (
            !userId ||
            !location ||
            location.ltd == null ||
            location.lng == null
          ) {
            console.log("❌ INVALID LOCATION PAYLOAD");
            return;
          }

          await Captain.findByIdAndUpdate(userId, {
            location: {
              ltd: location.ltd,
              lng: location.lng,
            },
          });

          console.log(
            `✅ Location updated | captain=${userId} | ltd=${location.ltd} | lng=${location.lng}`
          );
        })
      );
      socket.on(
        "disconnect",
        asyncHandler(async () => {
          console.log(`Client disconnected: ${socket.id}`);
        })
      );
    })
  );
};

export const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export const broadcastEvent = (event, data) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.log("Socket.io not initialized.");
  }
};
