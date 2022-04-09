const Router = require('express');
const router = new Router();

const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.json({user: "yuliia"})
})


router.post('/login', AuthController.login)
router.post('/registration', AuthController.register)

module.exports = router;