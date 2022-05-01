const ApiError = require("../errors/apiError");

async function isDev(req, res, next) {
  if (req.user.role !== "developer") {
    return next(
      ApiError.badRequest("Only developers have permition for this route")
    );
  }
  next();
}

async function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return next(
      ApiError.badRequest("Only admins have permition for this route")
    );
  }
  next();
}

async function isGamer(req, res, next) {
  if (req.user.role !== "gamer") {
    return next(
      ApiError.badRequest("Only gamers have permition for this route")
    );
  }
  next();
}

module.exports = { isDev, isAdmin, isGamer };
