require("dotenv").config();
require("./db/index.js");

const express = require("express");
const wordsRoutes = require("./routes/wordRoutes.js");
const app = express();

app.use(express.json());

app.use("*", (req, res, next) => {
  if (!req.is("application/json")) {
    res.sendStatus(415);
  } else {
    next();
  }
});
const wordRoutes = require("./routes/wordRoutes.js");

app.use("/word", wordsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Ready on port ${port}`);
});
