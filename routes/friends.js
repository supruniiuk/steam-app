const Router = require("express");
const router = new Router();

const authMiddleware = require("../middleware/authMiddleware");
const FriendController = require("../controllers/friendController");

router.get("/", authMiddleware, FriendController.getFriends);
router.get("/search", authMiddleware, FriendController.getPossibleFriends);
router.get("/subs", authMiddleware, FriendController.getSubscriptions);
router.get("/new", authMiddleware, FriendController.getFriendRequests);

router.post("/", authMiddleware, FriendController.addNewFriend);
router.patch("/:id", authMiddleware, FriendController.approveFriend);
router.delete("/:id", authMiddleware, FriendController.deleteFriend);

module.exports = router;
