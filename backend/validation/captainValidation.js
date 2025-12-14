import Joi from "joi";

export const registerCaptainSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
  }).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(50)
    .required()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),

  password: Joi.string().min(6).max(50).required(),

  socketId: Joi.string().allow("").optional(),

  status: Joi.string().valid("active", "inactive").default("active"),

  vehicle: Joi.object({
    color: Joi.string().min(3).required(),
    plate: Joi.string().min(3).required(),
    capacity: Joi.number().min(1).required(),
    vehicleType: Joi.string()
      .valid("car", "motorcycle", "auto")
      .required(),
  }).required(),

  location: Joi.object({
    lat: Joi.number().default(0),
    lng: Joi.number().default(0),
  }).default({ lat: 0, lng: 0 }),
});

export const captainLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});
