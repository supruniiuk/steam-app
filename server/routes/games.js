const Router = require("express");
const router = new Router();

const GameController = require("../controllers/gameController");
const authMiddleware = require("../middleware/authMiddleware");
const idMiddleware = require("../middleware/idMiddleware");
const { isDev, isAdmin } = require("../middleware/roleMiddleware");
const {
  gameCreationValidation,
} = require("../middleware/validationMiddleware");

router.get("/", authMiddleware, GameController.getApprovedGames);
router.get("/dev", [authMiddleware, isDev], GameController.getDevGames);
router.get(
  "/admin",
  [authMiddleware, isAdmin],
  GameController.getGamesForApprove
);
router.post("/", [authMiddleware, isDev, gameCreationValidation], GameController.createGame);
router.put(
  "/:id",
  [authMiddleware, isDev, idMiddleware],
  GameController.updateGame
);
router.patch(
  "/:id",
  [authMiddleware, isAdmin, idMiddleware],
  GameController.approveGame
);
router.delete(
  "/:id",
  [authMiddleware, isDev, idMiddleware],
  GameController.deleteGame
);

module.exports = router;
