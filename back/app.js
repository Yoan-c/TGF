const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userRoute");
const questionRoute = require("./route/questionRoute");
const commentsRoute = require("./route/commentRoute");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use("/user", userRoute);
app.use("/questions", questionRoute);
app.use("/comment", commentsRoute);
app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "page par defaut",
  });
});

// ON fait un MIDDLEWARE global pour gerer des erreur de fonctionnement et pas ceux lié au bug de code
app.use(globalErrorHandler);

module.exports = app;
