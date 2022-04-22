const mongoose = require("mongoose");
const ApiError = require("../errors/apiError");
const GameOwning = require("../models/gameOwning");
const GameController = require("../controllers/gameController");

class GameOwningController {
  async getUserGames(req, res, next) {
    const userId = req.user.id;
    const ObjectId = mongoose.Types.ObjectId;

    try {
      let gameOwnings = await GameOwning.aggregate([
        {
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "_id",
            as: "game",
          },
        },
        {
          $match: {
            userId: ObjectId(userId),
          },
        },
        {
          $project: {
            game: 1,
          },
        },
      ]);

      gameOwnings = gameOwnings.map((owning) => {
        let game = GameController.constructor.getGamesArray(owning.game)[0];
        game.ownId = owning._id;
        return game;
      });
      res.json(gameOwnings);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getAllOwnings(req, res, next) {
    const userId = req.user.id;
    try {
      let gameOwnings = await GameOwning.find({ userId });
      gameOwnings = gameOwnings.map((game) => game.gameId);
      res.json(gameOwnings);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async addGame(req, res, next) {
    const gameId = req.params.id;
    const userId = req.user.id;

    try {
      const ifExist = await GameOwning.findOne({ userId, gameId });

      if (ifExist) {
        return next(ApiError.badRequest(`You already have this game`));
      }

      const gameOwning = await GameOwning({ userId, gameId });
      gameOwning.save();
      res.json({ message: "Game successfully added" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteGame(req, res, next) {
    const gameId = req.params.id;
    const userId = req.user.id;

    try {
      await GameOwning.findOneAndDelete({ userId, gameId });
      res.json({ message: "Game successfully deleted" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteAllOwnings(req, res, next) {
    const userId = req.user.id;

    try {
      await GameOwning.deleteMany({ userId });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new GameOwningController();
