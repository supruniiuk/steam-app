const mongoose = require("mongoose");
const ApiError = require("../errors/apiError");
const Friend = require("../models/friend");
const User = require("../models/user");

class FriendController {
  async getPossibleFriends(req, res, next) {
    const userId = req.user.id;


    try {
    const friends = await Friend.find({
      $or: [{ publisherId: userId }, { subscriberId: userId }],
    });

    const friendsIdArr = friends.map(friend => friend._id).concat(userId);

    let possibleFriends = await User.find({ _id: { $nin: friendsIdArr },  role: { $nin: 'admin' }}, {password: 0, updatedAt: 0, __v: 0})

    possibleFriends = possibleFriends.map(friend => {
      return {
        id: friend._id,
        username: friend.username,
        email: friend.email,
        role: friend.role,
        birthday: friend.birthday,
        createdAt: friend.createdAt,
      }
    })
    
    res.json(possibleFriends);
  } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

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
      res.json({ message: `Friend's request successfully created` });
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
      const request = await Friend.findOne({ _id: requestId });
      if (userId !== request.publisherId.toString()) {
        return next(ApiError.badRequest(`You can't approve request`));
      }
      await Friend.findByIdAndUpdate({ _id: requestId }, { approved: true });
      res.json({ message: `Friend's request successfully approved` });
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
