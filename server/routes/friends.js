const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/authMiddleware');
const FriendController = require('../controllers/friendController');

router.get('/', authMiddleware, FriendController.getFriends);
router.post('/', authMiddleware, FriendController.addFriend);
router.patch('/:id', authMiddleware, FriendController.approveFriend);
router.delete('/:id', authMiddleware, FriendController.deleteFriend);

module.exports = router;
