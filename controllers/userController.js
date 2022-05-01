const ApiError = require("../errors/apiError");
const User = require("../models/user");
const Game = require("../models/game");
const GameOwningController = require("../controllers/gameOwningController");
const FriendsController = require("../controllers/friendController");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = (await User.find()) || [];
      res.json(users);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async updateUser(req, res, next) {
    const { username, birthday } = req.body;
    const userId = req.params.id;

    if (!username) {
      return next(ApiError.badRequest(`Field 'username' is required`));
    } else if (!birthday) {
      return next(ApiError.badRequest(`Field 'birthday' is required`));
    }

    try {
      const user = await User.findOne({ username });
      if (user && user._id.toString() !== userId) {
        return next(
          ApiError.badRequest(
            `User with username '${username}' is already exists`
          )
        );
      }
      await User.findOneAndUpdate({ _id: userId }, { username, birthday });

      res.json({ message: "User successfuly updated" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteUser(req, res, next) {
    const userId = req.params.id;

    try {
      await User.findOneAndDelete({ _id: userId });
      Game.deleteMany({ creatorId: userId });
      GameOwningController.deleteAllOwnings(req, res, next);
      FriendsController.deleteAllFriendsConnections(req, res, next);

      res.json({ message: "User successfuly deleted" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new UserController();
