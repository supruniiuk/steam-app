const mongoose = require('mongoose');
const ApiError = require('../errors/apiError');
const GameOwning = require('../models/gameOwning');

class GameOwningController {
  async getAllOwnings(req, res, next) {
    const userId = req.user.id;
    try {
      const gameOwnings = await GameOwning.aggregate([
        {
          $match: { _id: userId },
          $lookup: {
            from: 'games',
            localField: 'gameId',
            foreignField: '_id',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  title: 1,
                  price: 1,
                  description: 1,
                  tags: 1,
                },
              },
            ],
            as: 'creator',
          },
        },
      ]);
      res.json(gameOwnings);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async addGame(req, res, next) {
    const gameId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(gameId)) {
      return next(ApiError.badRequest(`Invalid game id`));
    }

    try {
      const gameOwning = await GameOwning({ userId, gameId });
      gameOwning.save();
      res.json({ message: 'Game successfully added' });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteGame(req, res, next) {
    const gameOwningId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(gameOwningId)) {
      return next(ApiError.badRequest(`Invalid game id`));
    }

    try {
      await GameOwning.findByIdAndDelete({ _id: gameOwningId });
      res.json({ message: 'Game successfully deleted' });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new GameOwningController();
