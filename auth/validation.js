const Joi = require("@hapi/joi");
exports.validateSignUp = (req, res, next) => {
  if (isNaN(req.body.phoneNumber))
    return res.status(400).send({ message: "phone number is not a number" });
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    phoneNumber: Joi.number().integer().greater(0).required(),
    password: Joi.string().min(5).max(255).required(),
    latePosition: Joi.number().required(),
    longPosition : Joi.number().required(),
    token : Joi.string().required(),
    image : Joi.any(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

exports.validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
