export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body,{ abortEarly: false });// return to object error and data 
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  console.log("🔍 Validating body:", req.body);

  next();
};
