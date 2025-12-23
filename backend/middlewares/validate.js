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

export const validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map(d => d.message).join(", "),
    });
  }

  next();
};

export const validateMap = (schema, property = "body") => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    next();
  };
};


