const router = require("express").Router();
const authorizationController = require("../controllers/authorizationController");

router.post("/register", authorizationController.register);
router.post("/login", authorizationController.logUserIn);
router.post("/logout", authorizationController.logout);
router.post("/refreshToken", authorizationController.generateAccessToken);

module.exports = router;
