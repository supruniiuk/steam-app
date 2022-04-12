const ApiError = require('../errors/apiError');
const AuthController = require('./authController')
const User = require('../models/user');
const Game = require('../models/game');

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
      if (user) {
        return next(
          ApiError.badRequest(
            `User with username '${username}' is already exists`
          )
        );
      }
      await User.findOneAndUpdate({ _id: userId }, { username, birthday });

      res.json({ message: 'User successfuly updated' });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteUser(req, res, next) {
    const password = req.body.password;
    const userId = req.params.id;

    if (!password) {
      return next(ApiError.badRequest(`Field 'password' is required`));
    }

    try {
      const user = await User.findOne({ _id: userId });

      AuthController.checkPassword(password, user.password)

      await User.findOneAndDelete({ _id: userId });
      await Game.deleteMany({ creatorId: userId });

      res.json({ message: 'User successfuly deleted' });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new UserController();
