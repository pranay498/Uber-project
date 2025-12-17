import crypto from "crypto";

export const generateOtp = (length = 6) => {
  return crypto
    .randomInt(Math.pow(10, length - 1), Math.pow(10, length))
    .toString();
};
