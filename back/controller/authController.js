const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    maxAge: 3600 * 1000, // expiration après 1 heure
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  user.password = "";

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Entrez le mail / mot de passe", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(user.password, password))) {
    return next(new AppError("email ou mot de passe incorrect", 401));
  }
  user.password = "";
  req.user = user;
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError("You are not looged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError("The user to this token does no longer exist", 401)
    );
  req.user = freshUser;
  req.updatePhoto = false;
  req.oldPhotoName = req.user.photo;
  res.locals.user = freshUser;
  next();
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expiresIn: Date.now() - 1,
  });
  req.user = "";
  res.status(200).json({
    status: "success",
    message: "disconnected",
  });
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role))
      return next(new AppError("Vous n'avez pas la persmission", 403));
    next();
  };
};
