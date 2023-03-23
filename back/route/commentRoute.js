const express = require("express");
const commentController = require("../controller/commentController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/:id/comments").get(commentController.getComments);
router.use(authController.protect);
router.route("/:id/comments").post(commentController.addComments);

module.exports = router;
