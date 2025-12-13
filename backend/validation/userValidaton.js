import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3).max(30).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name is too long",
    }),
    lastname: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name is too long",
    }),
  }).required(),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).max(50).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password is too long",
    "string.empty": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});