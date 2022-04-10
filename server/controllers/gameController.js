const ApiError = require("../errors/apiError");
const Game = require("../models/game");

class GameController {
  async getAllGames(req, res, next) {
    try { 
        const games = await Game.find() || [];
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
    console.log("update game");
  }

  async deleteGame(req, res, next) {
    console.log("delete game");
  }
}

module.exports = new GameController();
