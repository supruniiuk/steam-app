const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const ApiError = require('../errors/apiError');

module.exports = async function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const bearer = req.headers.authorization.split(' ')[0];

    if (!token || bearer !== 'Bearer') {
      return next(ApiError.badRequest(`Not Authorized`));
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return next(ApiError.badRequest(`Not Authorized`));
  }
};
