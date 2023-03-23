const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../model/userModel");

exports.getAllUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "ok",
  });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  let user = req.user;
  const { password, newPassword } = req.body;
  if (!password) return next(new AppError("check your password", 400));
  user = await User.findById(user._id).select("+password");
  if (!(await user.correctPassword(user.password, password)))
    return next(new AppError("incorrect password", 400));
  user.password = newPassword;
  user.confirmPassword = newPassword;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "password updated",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { username } = req.body;
  if (!id || !username) return next(new AppError("Erreur user", 400));
  const user = await User.findByIdAndUpdate(
    id,
    { username },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "username updated",
    user,
  });
});
