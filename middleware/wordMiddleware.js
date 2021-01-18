const messages = require("../constants/messages");
const statuses = require("../constants/statuses");
const Words = require("../models/Words");

const checkExistance = async (req, res, next) => {
  if (!req.body.word?.length)
    res.status(statuses[422]).json(messages.empty).end();
  const word = req.body.word;
  const checkExisting = await Words.findOne({ word });
  if (checkExisting) {
    return res.status(statuses[422]).json(messages.duplicate).end();
  }
  next();
};
module.exports = {
  checkExistance,
};
