const Router = require("express");
const router = new Router();

const AuthController = require("../controllers/authController");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registrationValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");

router.post("/login", loginValidation, AuthController.login);
router.post("/registration", registrationValidation, AuthController.register);

router.get("/", authMiddleware, UserController.getAllUsers);
router.put("/:id", authMiddleware, UserController.updateUser);
router.delete("/", authMiddleware, UserController.deleteUser);

module.exports = router;
