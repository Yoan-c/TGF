const express = require("express");
const questionController = require("../controller/questionController");
const commentController = require("../controller/commentController");
const authController = require("../controller/authController");

const router = express.Router();
router.get("/", questionController.getAllQuestion);
router.route("/:id/comments").get(commentController.getComments);
router.use(authController.protect);

router.post("/create", questionController.createQuestion);

router
  .route("/:id")
  .get(questionController.getQuestion)
  .delete(
    authController.restrictTo("admin"),
    questionController.deleteQuestion
  );
router.patch("/:id/resolve", questionController.resolveQuestion);

router.route("/:id/comments").post(commentController.addComments);
router.route("/:id/comments/:idComment").post(commentController.deleteComments);

module.exports = router;
