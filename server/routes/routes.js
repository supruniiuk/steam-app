const Router = require('express');
const router = new Router();

const userRouter = require('./users')
const gameRouter = require('./games')

router.use('/users', userRouter)
router.use('/games', gameRouter)

module.exports = router;