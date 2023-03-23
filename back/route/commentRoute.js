const express = require("express");
const commentController = require("../controller/commentController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/:id")
  .get(commentController.getOneComments)
  .put(commentController.UpdateComments)
  .delete(commentController.deleteComments);

module.exports = router;
