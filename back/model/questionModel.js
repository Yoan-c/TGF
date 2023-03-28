const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "A question is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "An explanation is required."],
  },
  creationQuestion: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A question is asked by a user"],
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comments",
      default: "",
    },
  ],
  updateQuestion: {
    type: Date,
    default: Date.now(),
  },
  isResolve: {
    type: Boolean,
    default: false,
  },
});

questionSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "user",
    select: ["email", "username", "photo"],
  });
  next();
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
