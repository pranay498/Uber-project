import User from "../models/user.models.js";
import logger from "../utils/logger.js";
import {generateUserToken} from "../utils/generateToken.js";

export const registerUserService = async ({ fullname, email, password }) => {

  if (!fullname?.firstname || !email || !password) {
    const error = new Error("Firstname, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ fullname, email, password });
  logger.info(` User created successfully: ${email}`);


  const token = generateUserToken(user);

  
  return {
    role: "user", // 👈 lets frontend know it’s user
      token,
      user,
  };
};

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateUserToken(user);

  logger.info(`✅ User logged in: ${email}`);

  return {
    user, token 
  };
};

