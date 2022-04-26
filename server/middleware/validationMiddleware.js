const ApiError = require("../errors/apiError");
const joi = require("joi");
const { ROLES } = require("../constants/userRoles");

async function registrationValidation(req, res, next) {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.email().string().required(),
    role: joi
      .string()
      .valid(...ROLES)
      .required(),
    password: joi.string().required(),
    birthday: joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return next(ApiError.badRequest(`Registration field validation failed`));
  }
}

async function loginValidation(req, res, next) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return next(ApiError.badRequest(`Login field validation failed`));
  }
}

async function gameCreationValidation(req, res, next) {
  const schema = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    tags: joi.array().required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return next(ApiError.badRequest(`Login field validation failed`));
  }
}

module.exports = {
  registrationValidation,
  loginValidation,
  gameCreationValidation,
};
