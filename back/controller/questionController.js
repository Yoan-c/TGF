const Question = require("../model/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterQuestion = (query) => {
  let { answer, orderby, asc, search } = query;
  if (!answer || answer !== "false") answer = true;
  else answer = false;
  if (!orderby || orderby !== "answer") orderby = "creationQuestion";
  else orderby = "comments";
  if (!asc || asc !== "false") asc = true;
  else asc = false;

  let research = {};
  if (search) {
    var exp = new RegExp(search, "gi");
    research = {
      question: { $regex: exp },
    };
  }
  if (!answer) research = { ...research, comments: { $size: 0 } };

  const filter = {
    sort: asc == true ? orderby : `-${orderby}`,
    isAnswer: research,
  };
  return filter;
};

exports.getAllQuestion = catchAsync(async (req, res, next) => {
  const filter = filterQuestion(req.query);
  let questions = await Question.find(filter.isAnswer).sort(filter.sort);
  if (filter.sort === "-comments")
    questions.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  res.status(200).json({
    status: "success",
    message: "Toute les questions",
    questions,
    size: questions.length,
  });
});

exports.createQuestion = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description)
    return next(
      new AppError("Please indicate a title and/or your issue.", 400)
    );
  const question = await Question.create({
    question: title,
    description,
    user: req.user,
  });

  res.status(200).json({
    status: "success",
    message: "Question posé sur le forum",
    question,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("An error has occurred. ", 400));
  let question = await Question.findById(id).populate("comments");
  if (!question)
    return next(new AppError("No question found on the forum", 400));

  res.status(200).json({
    status: "success",
    question,
    user: req.user,
  });
});

exports.resolveQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Please indicate the title. ", 400));
  const question = await Question.findByIdAndUpdate(
    id,
    { isResolve: true },
    { new: true }
  );
  if (!question)
    return next(new AppError("No question found on the forum", 400));

  res.status(200).json({
    status: "success",
    message: "Question posé sur le forum est résolue",
    question,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Please indicate the title. ", 400));
  await Question.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
  });
});
