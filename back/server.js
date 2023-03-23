const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DB_SERVER.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connexion database`);
  })
  .catch((err) => {
    console.log(`erreur database error: ${err}`);
  });
const PORT = process.env.PORT || 3000;

app.listen(PORT, (_) => {
  console.log(`Server listening on port ${PORT}`);
});
