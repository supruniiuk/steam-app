const Router = require('express');
const router = new Router();

const userRouter = require('./users');
const gameRouter = require('./games');
const friendRouter = require('./friends');
const gameOwningRoutert = require('./gameOwning');

router.use('/users', userRouter);
router.use('/friends', friendRouter);
router.use('/games', gameRouter);
router.use('/games/owning', gameOwningRoutert);

module.exports = router;
