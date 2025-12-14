import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUserService } from "../services/user.services.js";
import { loginUserService } from "../services/user.services.js";
import BlacklistToken from "../models/blacklistToken.model.js"
import logger from "../utils/logger.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await registerUserService({ fullname, email, password });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res
    .status(201)
    .cookie("token", user.token, cookieOptions)
    .json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  };

  res
    .status(200)
    .cookie("token", user.token, cookieOptions)
    .json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });

    const token = req.cookies.token || req.headers.authorization?.split(""[1])

    if(token){
        await BlacklistToken.create({token});
    }
    else{
        logger.warn("No token found to blacklist on logout")
    }
  logger.info(`👋 User logged out`);
});

export const getProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,      
    })
})

