const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
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
// Ici on met le fichier dans le buffer pour eviter de l'ecrire sur le DD , le reprendre pour modif et save encore
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  if (req.params.id !== req.user.id)
    return next(new AppError("Erreur : user not found", 400));

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  req.updatePhoto = true;
  req.oldPhotoName = req.user.photo == "default.png" ? "" : req.user.photo;
  req.user.photo = req.file.filename;

  // ici on lit le fichier dans le buffer et on fait plein de traitement dessus pour ensuite le save en jpeg
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../../front/public/img/${req.file.filename}`);

  next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { username } = req.body;
  if (!id || !username) return next(new AppError("Erreur user", 400));
  const user = await User.findByIdAndUpdate(
    id,
    { username, photo: req.user.photo },
    {
      new: true,
      runValidators: true,
    }
  );

  if (req.updatePhoto && req.oldPhotoName) {
    req.updatePhoto = false;
    console.log(`${__dirname}/../../front/public/img/${req.oldPhotoName}`);
    fs.unlink(
      `${__dirname}/../../front/public/img/${req.oldPhotoName}`,
      (err) => {
        console.log(err);
      }
    );
  }
  req.user = user;
  res.status(200).json({
    status: "success",
    message: "username updated",
    user,
  });
});
