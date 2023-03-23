const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    date: {
      type: Date,
    },
    imageId: { type: Number },
    description: {
      type: String,
      require,
      maxlength: 2000,
    },
    userId: {
      type: String,
      require,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      maxlength: 500,
    },
  })
);

exports.Image = Image;
