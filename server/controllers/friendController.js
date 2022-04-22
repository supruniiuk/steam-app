const ApiError = require("../errors/apiError");
const Friend = require("../models/friend");
const User = require("../models/user");

class FriendController {
  static getFriendsArray(friends) {
    return friends.map((friend) => {
      return {
        id: friend._id,
        username: friend.username,
        email: friend.email,
        role: friend.role,
        birthday: friend.birthday,
        createdAt: friend.createdAt,
      };
    });
  }

  static getFriendsId(connections, userId) {
    return connections.map((friend) => {
      if (friend.publisherId.toString() === userId) {
        return friend.subscriberId.toString();
      } else {
        return friend.publisherId.toString();
      }
    });
  }

  async getFriends(req, res, next) {
    const userId = req.user.id;

    try {
      const connections = await Friend.find({
        $or: [
          { publisherId: userId, approved: true },
          { subscriberId: userId, approved: true },
        ],
      });

      const friendsId = FriendController.getFriendsId(connections, userId);

      let friends = await User.find(
        { _id: { $in: friendsId } },
        { password: 0, updatedAt: 0, __v: 0 }
      );
      friends = FriendController.getFriendsArray(friends);

      res.json(friends);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getSubscriptions(req, res, next) {
    const userId = req.user.id;

    try {
      const connections = await Friend.find({
        subscriberId: userId,
        approved: false,
      });

      const publishersId = FriendController.getFriendsId(connections, userId);

      let subscriptions = await User.find(
        { _id: { $in: publishersId } },
        { password: 0, updatedAt: 0, __v: 0 }
      );

      subscriptions = FriendController.getFriendsArray(subscriptions);

      res.json(subscriptions);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getPossibleFriends(req, res, next) {
    const userId = req.user.id;

    try {
      const friends = await Friend.find({
        $or: [{ publisherId: userId }, { subscriberId: userId }],
      });

      const friendsIdArr = FriendController.getFriendsId(
        friends,
        userId
      ).concat(userId);

      let possibleFriends = await User.find(
        { _id: { $nin: friendsIdArr }, role: { $nin: "admin" } },
        { password: 0, updatedAt: 0, __v: 0 }
      );

      possibleFriends = FriendController.getFriendsArray(possibleFriends);

      res.json(possibleFriends);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getFriendRequests(req, res, next) {
    const userId = req.user.id;

    try {
      const requests = await Friend.find({
        publisherId: userId,
        approved: false,
      });

      const subscribersIdArr = FriendController.getFriendsId(requests, userId);

      let subscribers = await User.find(
        { _id: { $in: subscribersIdArr } },
        { password: 0, updatedAt: 0, __v: 0 }
      );

      subscribers = FriendController.getFriendsArray(subscribers);
      res.json(subscribers);
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async addNewFriend(req, res, next) {
    const publisherId = req.body.publisherId;
    const userId = req.user.id;

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(ApiError.badRequest(`User does not exist`));
      }

      const isExist = await Friend.find({
        $or: [
          { publisherId: userId, subscriberId: publisherId },
          { publisherId: publisherId, subscriberId: userId },
        ],
      });

      if (isExist.length) {
        return next(ApiError.badRequest(`Friend request already sent`));
      }

      const friend = new Friend({ subscriberId: userId, publisherId });
      friend.save();
      res.json({ message: `Friend's request successfully created` });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async approveFriend(req, res, next) {
    const userId = req.user.id;
    const friendId = req.params.id;

    try {
      const user = await User.findOne({ _id: friendId });
      if (!user) {
        return next(ApiError.badRequest(`User does not exist`));
      }

      const request = await Friend.findOne({
        publisherId: userId,
        subscriberId: friendId,
      });

      await Friend.findByIdAndUpdate({ _id: request._id }, { approved: true });
      res.json({ message: `Friend's request successfully approved` });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteFriend(req, res, next) {
    const userId = req.user.id;
    const friendId = req.params.id;

    try {
      await Friend.findOneAndDelete({
        $or: [
          { publisherId: userId, subscriberId: friendId },
          { publisherId: friendId, subscriberId: userId },
        ],
      });

      res.json({ message: "Friend request successfully canceled" });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteAllFriendsConnections(req, res, next) {
    const userId = req.user.id;

    try {
      await Friend.deleteMany({
        $or: [{ publisherId: userId }, { subscriberId: userId }],
      });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new FriendController();
