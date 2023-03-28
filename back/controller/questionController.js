const Question = require("../model/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterQuestion = (query) => {
  let { answer, orderby, asc } = query;
  if (!answer || answer !== "false") answer = true;
  else answer = false;
  if (!orderby || orderby !== "answer") orderby = "creationQuestion";
  else orderby = "comments";
  if (!asc || asc !== "false") asc = true;
  else asc = false;

  const filter = {
    sort: asc == true ? orderby : `-${orderby}`,
    isAnswer: answer ? {} : { comments: { $size: 0 } },
  };
  return filter;
};

exports.getAllQuestion = catchAsync(async (req, res, next) => {
  const filter = filterQuestion(req.query);

  let questions = await Question.find(filter.isAnswer).sort(filter.sort);

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
      new AppError("Veuillez indiquer un titre et ou votre probleme", 400)
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
  if (!id) return next(new AppError("Une erreur est survenue ", 400));
  let question = await Question.findById(id).populate("comments");
  if (!question)
    return next(new AppError("Aucune question trouvé sur le forum", 400));

  res.status(200).json({
    status: "success",
    question,
    user: req.user,
  });
});

exports.resolveQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Veuillez indiquer le titre ", 400));
  const question = await Question.findByIdAndUpdate(
    id,
    { isResolve: true },
    { new: true }
  );
  if (!question)
    return next(new AppError("Aucune question trouvé sur le forum", 400));

  res.status(200).json({
    status: "success",
    message: "Question posé sur le forum est résolue",
    question,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Veuillez indiquer le titre ", 400));
  await Question.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
  });
});
