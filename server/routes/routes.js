const Router = require('express');
const router = new Router();

const userRouter = require('./user')
router.use('/users', userRouter)

module.exports = router;