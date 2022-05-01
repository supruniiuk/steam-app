const mongoose = require("mongoose");
const ApiError = require("../errors/apiError");

module.exports = async function (req, res, next) {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return next(ApiError.badRequest(`Invalid param id`));
    }
    next();
  } catch (error) {
    return next(ApiError.badRequest(`Not Authorized`));
  }
};
