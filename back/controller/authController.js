const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

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
  createSendToken(user, 200, req, res);
});
