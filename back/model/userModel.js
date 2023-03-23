const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Entrez un pseudo"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Entrez une adresse email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Entrez une adresse email valide"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Entrez un mot de passe"],
    minlength: 4,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirmer votre mote de passe"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Les mots de passe sont différents",
    },
  },
  compteCreated: {
    type: Date,
    default: Date,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
