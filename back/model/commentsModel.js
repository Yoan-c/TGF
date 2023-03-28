const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  creationComments: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Une question est posé par un utilisateur"],
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "question",
    required: [true, "Un commentaire concerne une question"],
  },
  comments: {
    type: String,
  },
  updateComments: {
    type: Date,
    default: Date.now(),
  },
});

commentsSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "user",
    select: ["username"],
  });
  next();
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
