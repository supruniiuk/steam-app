const Router = require('express');
const router = new Router();

const gameController = require('../controllers/gameController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, gameController.getAllGames)
router.post('/', authMiddleware, gameController.createGame);
router.put('/', authMiddleware, gameController.updateGame)
router.delete('/', authMiddleware, gameController.deleteGame)

module.exports = router;
