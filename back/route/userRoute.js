const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.use(authController.protect);
router.patch("/updatePassword", userController.updatePassword);
router.get("/", userController.getAllUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
