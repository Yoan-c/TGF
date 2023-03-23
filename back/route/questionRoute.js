const express = require("express");
const questionController = require("../controller/questionController");
const authController = require("../controller/authController");

const router = express.Router();
router.get("/", questionController.getAllQuestion);
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

module.exports = router;
