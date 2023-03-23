const Comment = require("../model/commentsModel");
const Question = require("../model/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getComments = catchAsync(async (req, res, next) => {
  let comments = await Comment.find();
  res.status(200).json({
    status: "success",
    message: "commentaires",
    comments,
    size: comments.length,
  });
});

exports.addComments = catchAsync(async (req, res, next) => {
  const { comments } = req.body;
  const id = req.params.id;

  if (!id) return next(new AppError("Une erreur est survenu", 400));
  if (!comments)
    return next(new AppError("Il y a aucun commentaire d'envoyer", 400));
  let question = await Question.findById(id);
  if (!question)
    return next(new AppError("Aucune question trouvé sur le forum", 400));
  question.updateQuestion = Date.now();
  question.save();
  const comment = await Comment.create({
    user: req.user.id,
    question: question.id,
    comments,
  });
  res.status(200).json({
    status: "success",
    comment,
  });
});

exports.deleteComments = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Une erreur est survenu", 400));
  let comment = await Comment.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
  });
});

exports.getOneComments = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Une erreur est survenu", 400));
  let comment = await Comment.findById(id);
  res.status(200).json({
    status: "success",
    comment,
  });
});
