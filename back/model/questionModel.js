const mongoose = require("mongoose");

const questionSchema = mongoose.createSchema({
  question: {
    type: String,
    required: [true, "Une question est requise"],
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

const Question = mongoose.model("Comments", questionSchema);

module.exports = Question;
