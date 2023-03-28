const { request } = require("express");
const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("ERRROOR");
  if (process.env.NODE_ENV === "production") {
    sendErrorDev(err, req, res);
  } else {
    let error = Object.assign(err);
    console.log(error.code);
    if (error.name === "CastError") {
      error = handleCastErrorDb(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
      console.log(error.message);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
      console.log(error.message);
    }
    sendErrorProd(error, req, res);
  }
};

const sendErrorDev = (err, req, res) => {
  console.log("err ici");
  return res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  console.log("err la");
  console.log(err.message);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value !`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  // object.value() va iterer sur tout les objet ( on connait pas leur nom)
  // ex "errors" : { "name" : { "message" : "erreur name"}, ...}, {"difficulty" : {"message" : "erreur difficulty"}, ...}..,
  const errors = Object.values(err.errors).map((el) => el.message);
  console.log(errors);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
