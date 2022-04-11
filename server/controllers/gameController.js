const mongoose = require("mongoose");
const ApiError = require("../errors/apiError");
const Game = require("../models/game");

class GameController {
  async getAllGames(req, res, next) {
    try {
      const games = (await Game.find()) || [];
      res.json(games);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async createGame(req, res, next) {
    const role = req.user.role;
    const creatorId = req.user.id;
    const { title, price, description, tags } = req.body;

    if (role !== "developer") {
      return next(ApiError.badRequest(`You're not allowed to create games`));
    }

    try {
      const checkGame = await Game.findOne({ title })
      if(checkGame) {
        return next(ApiError.badRequest(`Game '${title}' already exists`));
      }
      const game = new Game({
        title,
        price,
        description,
        tags,
        creatorId,
      });
      await game.save();
      res.json({ message: "Game successfully created" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async updateGame(req, res, next) {
    const game = req.body.game
    const creatorId = req.user.id
    const gameId = req.params.id

    if (!mongoose.isValidObjectId(gameId)) {
      return next(ApiError.badRequest(`Invalid game id`));
    }

    if (!game.creatorId) {
      return next(ApiError.badRequest(`Field 'creatorId' is required`));
    }

    if (creatorId !== game.creatorId.toString()) {
      return next(ApiError.badRequest(`You can't change this game`));
    }

    try {
      await Game.findOneAndUpdate({ _id: gameId }, {...game});
      res.json({ message: "Game successfully updated" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteGame(req, res, next) {
    const creatorId = req.user.id;
    const gameId = req.params.id;

    if (!mongoose.isValidObjectId(gameId)) {
      return next(ApiError.badRequest(`Invalid game id`));
    }

    try {
      const game = await Game.findOne({ _id: gameId });

      if (creatorId !== game.creatorId.toString()) {
        return next(ApiError.badRequest(`You can't delete this game`));
      }

      await Game.findByIdAndDelete({ _id: gameId });
      res.json({ message: "Game successfully deleted" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new GameController();
