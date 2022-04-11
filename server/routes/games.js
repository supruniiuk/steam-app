const Router = require('express');
const router = new Router();

const GameController = require('../controllers/gameController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, GameController.getAllGames)
router.post('/', authMiddleware, GameController.createGame);
router.put('/:id', authMiddleware, GameController.updateGame)
router.delete('/:id', authMiddleware, GameController.deleteGame)

module.exports = router;
