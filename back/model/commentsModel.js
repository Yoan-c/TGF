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
  comments: {
    type: String,
  },
  updateComments: {
    type: Date,
    default: Date.now(),
  },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
