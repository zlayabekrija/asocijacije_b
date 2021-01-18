const express = require("express");
const wordsRoutes = express.Router();
const messages = require("../constants/messages");
const statuses = require("../constants/statuses");
const { checkExistance } = require("../middleware/wordMiddleware");
const Words = require("../models/Words");

async function getWords(req, res) {
  const page = req.body.page ?? 0;
  const offset = req.body.offset ?? 500;
  const result = await Words.find()
    .skip(page > 0 ? page * offset : 0)
    .limit(offset);
  res
    .status(statuses[200])
    .json({ ...messages.success, result: result.map(({ word }) => word) });
}

async function postWords(req, res) {
  try {
    const word = req.body.word;
    console.log(word);
    const newWord = await new Words({ word }).save();
    res.status(statuses[201]).json(messages.successAdd);
  } catch (e) {
    console.log(e);
    res.status(statuses[422]).json(messages.error);
  }
}

wordsRoutes.route("/").get(getWords);
wordsRoutes.route("/").post(checkExistance, postWords);

module.exports = wordsRoutes;
