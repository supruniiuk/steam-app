const ApiError = require("../errors/apiError");
const Game = require("../models/game");

class GameController {
  static getGamesArray(games) {
    return games.map((game) => {
      game.id = game._id;
      return {
        id: game.id,
        title: game.title,
        price: game.price,
        description: game.description,
        tags: game.tags,
        createdAt: game.createdAt,
        creatorId: game.creatorId,
      };
    });
  }

  async getAllGames(req, res, next) {
    try {
      let games = (await Game.find({ approved: true })) || [];
      games = GameController.getGamesArray(games);
      res.json(games);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getDevGames(req, res, next) {
    const creatorId = req.user.id;
    try {
      let games = (await Game.find({ creatorId })) || [];
      games = GameController.getGamesArray(games);
      res.json(games);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getGamesForApprove(req, res, next) {
    try {
      let games = (await Game.find({ approved: false })) || [];
      games = GameController.getGamesArray(games);
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
      const checkGame = await Game.findOne({ title });
      if (checkGame) {
        return next(ApiError.badRequest(`Game '${title}' already exists`));
      }
      const game = new Game({
        title,
        price,
        description,
        tags,
        creatorId,
      });

      const newGame = await game.save();
      newGame.id = newGame._id;

      res.json({ message: "Game successfully created", game: newGame });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async updateGame(req, res, next) {
    const game = req.body;
    const creatorId = req.user.id;
    const gameId = req.params.id;

    if (!game.creatorId) {
      return next(ApiError.badRequest(`Field 'creatorId' is required`));
    }

    if (creatorId !== game.creatorId.toString()) {
      return next(ApiError.badRequest(`You can't change this game`));
    }

    try {
      await Game.findOneAndUpdate({ _id: gameId }, { ...game });
      res.json({ message: "Game successfully updated" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async approveGame(req, res, next) {
    const gameId = req.params.id;
    const role = req.user.role;

    try {
      await Game.findOneAndUpdate({ _id: gameId }, { approved: true });
      res.json({ message: "Game successfully approved" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteGame(req, res, next) {
    const creatorId = req.user.id;
    const gameId = req.params.id;

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
