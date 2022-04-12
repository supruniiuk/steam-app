const Router = require('express');
const router = new Router();

const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', AuthController.login);
router.post('/registration', AuthController.register);

router.get('/', authMiddleware, UserController.getAllUsers);
router.post('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
