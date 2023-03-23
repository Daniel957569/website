// const Joi = require("joi");
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: {
    require,
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  link: {
    require,
    type: String,
    minlength: 20,
    maxlength: 1000,
  },
  date: {
    type: Date,
  },
  linkId: { type: Number },
  userId: {
    type: String,
    require,
    maxlength: 1000,
  },
  image_preview: {
    type: String,
  },
});

const Link = mongoose.model("Link", linkSchema);

linkSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

linkSchema.set("toJSON", {
  virtuals: true,
});

// function validateLink(link) {
//     const Schema = {
//         name: Joi.string().min(5).max(255).required(),
//         link: Joi.string().min(5).max(1000).required(),
//     }
//     return Schema.validate(Schema, link);
// }

exports.Link = Link;
// exports.validate = validateLink;
