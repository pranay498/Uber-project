import Joi from "joi";

export const createRideSchema = Joi.object({
  pickup: Joi.string().min(3).required().messages({
    "any.required": "Pickup location is required",
    "string.empty": "Pickup location cannot be empty",
  }),

  destination: Joi.string().min(3).required().messages({
    "any.required": "Destination is required",
    "string.empty": "Destination cannot be empty",
  }),

  vehicleType: Joi.string()
    .valid("auto", "car", "moto")
    .required()
    .messages({
      "any.required": "Vehicle type is required",
      "any.only": "Vehicle type must be auto, car or moto",
    }),
});


export const getFareSchema = Joi.object({
  pickup: Joi.string().min(3).required(),
  destination: Joi.string().min(3).required(),
});

export const confirmRideSchema = Joi.object({
  rideId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "rideId is required",
      "string.length": "Invalid rideId",
    }),
});

export const startRideSchema = Joi.object({
  rideId: Joi.string().required(),
  otp: Joi.string().length(6).required(),
});
