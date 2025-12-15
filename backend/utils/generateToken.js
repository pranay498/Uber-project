import jwt from "jsonwebtoken";


export const generateCaptainToken = (captain) => {
  return jwt.sign(
    {
      id: captain._id,
      role: "captain",
      email: captain.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
export const generateUserToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: "user",
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};