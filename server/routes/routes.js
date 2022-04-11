const Router = require('express');
const router = new Router();

const userRouter = require('./users')
const gameRouter = require('./games')
const friendRouter = require('./friends')

router.use('/users', userRouter)
router.use('/games', gameRouter)
router.use('/friends', friendRouter)


module.exports = router;