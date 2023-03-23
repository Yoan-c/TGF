const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Une question est requise"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Une explication est requise"],
  },
  creationQuestion: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Une question est posé par un utilisateur"],
  },
  comments: {
    type: mongoose.Schema.ObjectId,
    ref: "Comments",
    default: null,
  },
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
