import Joi from "joi";

export const getCoordinatesSchema = Joi.object({
  address: Joi.string().min(3).required(),
});

export const distanceTimeQuerySchema = Joi.object({
  origin: Joi.string().min(3).required().messages({
    "any.required": "Origin is required",
    "string.empty": "Origin cannot be empty",
  }),

  destination: Joi.string().min(3).required().messages({
    "any.required": "Destination is required",
    "string.empty": "Destination cannot be empty",
  }),
});

export const autoCompleteQuerySchema = Joi.object({
  input: Joi.string().min(2).required().messages({
    "any.required": "Input query is required",
    "string.empty": "Input query cannot be empty",
  }),
});
