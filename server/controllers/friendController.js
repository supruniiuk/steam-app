const mongoose = require("mongoose");
const ApiError = require("../errors/apiError");
const Friend = require("../models/friend");

class FriendController {
  async getFriends(req, res, next) {
    const userId = req.user.id;

    try {
      const friends = await Friend.find({
        $or: [{ publisherId: userId }, { subscriberId: userId }],
      });
      res.json(friends);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async addFriend(req, res, next) {
    const publisherId = req.body.publisherId;
    const userId = req.user.id;

    if (!publisherId) {
      return next(ApiError.badRequest(`Field 'publisherId' is required`));
    }

    try {
      const friend = new Friend({ subscriberId: userId, publisherId });
      friend.save();
      res.json({ message: "Friend's request successfully created" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async approveFriend(req, res, next) {
    const userId = req.user.id;
    const requestId = req.params.id;

    if (!mongoose.isValidObjectId(requestId)) {
      return next(ApiError.badRequest(`Invalid friend request id`));
    }

    try {
      const request = await Friend.findOne({_id: requestId})
      if(userId !== request.publisherId.toString()) {
        return next(ApiError.badRequest(`You can't approve request`));
      }
      await Friend.findByIdAndUpdate({ _id: requestId }, { approved: true });
      res.json({ message: "Friend's request successfully approved" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteFriend(req, res, next) {
    const requestId = req.params.id;

    if (!mongoose.isValidObjectId(requestId)) {
      return next(ApiError.badRequest(`Invalid friend request id`));
    }

    try {
      await Friend.findByIdAndDelete({ _id: requestId });
      res.json({ message: "Friend successfully deleted" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }

  }
}

module.exports = new FriendController();
