const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    date: {
      type: Date,
    },
    videoId: { type: Number },
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
    videoUrl: {
      type: String,
      maxlength: 500,
    },
    image_preview: {
      type: String,
    },
    originalVideoUrl: { type: String },
    isIframe: { type: Boolean, default: false },
  })
);

exports.Video = Video;
