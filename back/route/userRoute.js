const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use(authController.protect);
router.patch("/updatePassword", userController.updatePassword);
router.get("/", userController.getAllUser);

module.exports = router;
