const express = require("express");
const userRoute = require("./route/userRoute");

const app = express();

app.use("/user", userRoute);
app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "page par defaut",
  });
});

module.exports = app;
