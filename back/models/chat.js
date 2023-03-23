// const Joi = require("joi");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: {
    require,
    type: String,
    maxlength: 255,
  },
  sender: {
    require,
    type: String,
    maxlength: 1000,
  },
  recevier: {
    require,
    type: String,
    maxlength: 1000,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

exports.Chat = Chat;
