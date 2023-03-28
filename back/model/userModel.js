const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a pseudo"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email address."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address."],
  },
  photo: {
    type: String,
    default: "default.png",
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [4, "password must be at least 4 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords do not match.",
    },
  },
  compteCreated: {
    type: Date,
    default: Date.now(),
  },
  tabQuestion: {
    type: [String],
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = "";
  next();
});

userSchema.methods.correctPassword = async function (userPassword, password) {
  return await bcrypt.compare(password, userPassword);
};

userSchema.methods.modifPassword = async function (password) {
  password = await bcrypt.hash(password, 12);
  return password;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
