import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();



const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,   // ✅ REQUIRED
  transports: ["websocket", "polling"],
});



const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from server");
    });

    // optional cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // 🔹 send event
  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  // 🔹 listen event
  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
