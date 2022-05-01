const Router = require('express');
const router = new Router();

const GameOwningController = require('../controllers/gameOwningController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, GameOwningController.getAllOwnings);
router.get('/list', authMiddleware, GameOwningController.getUserGames);
router.patch('/:id', authMiddleware, GameOwningController.addGame);
router.delete('/:id', authMiddleware, GameOwningController.deleteGame);

module.exports = router;
