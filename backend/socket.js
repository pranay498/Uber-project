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
      credentials: true,
    },
  });

  io.on(
    "connection",
    asyncHandler(async (socket) => {
      console.log("🟢 Client connected:", socket.id);

      socket.on(
        "join",
        asyncHandler(async ({ userId, userType }) => {
          if (!userId || !userType) return;

          if (userType === "user") {
            await User.findByIdAndUpdate(userId, {
              socketId: socket.id,
            });
          }

          if (userType === "captain") {
            await Captain.findByIdAndUpdate(userId, {
              socketId: socket.id,
            });
          }
        })
      );

      socket.on(
        "update-location-captain",
        asyncHandler(async ({ userId, location }) => {
          if (
            !userId ||
            !location ||
            location.lat == null ||
            location.lng == null
          ) {
            return;
          }

          await Captain.findByIdAndUpdate(userId, {
            location: {
              type: "Point",
              coordinates: [location.lng, location.lat],
            },
          });
        })
      );

      socket.on(
        "disconnect",
        asyncHandler(async () => {
          await User.findOneAndUpdate(
            { socketId: socket.id },
            { socketId: null }
          );

          await Captain.findOneAndUpdate(
            { socketId: socket.id },
            { socketId: null }
          );

          console.log("🔴 Client disconnected:", socket.id);
        })
      );
    })
  );
};

export const sendMessageToSocketId = (socketId, event, data) => {
  if (!io) return;
  io.to(socketId).emit(event, data);
};
