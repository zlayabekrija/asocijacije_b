const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("words", WordSchema);
