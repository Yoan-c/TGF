const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userRoute");
const questionRoute = require("./route/questionRoute");
const commentsRoute = require("./route/commentRoute");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/questions", commentsRoute);
app.use("/questions", questionRoute);
app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "page par defaut",
  });
});

// ON fait un MIDDLEWARE global pour gerer des erreur de fonctionnement et pas ceux lié au bug de code
app.use(globalErrorHandler);

module.exports = app;
