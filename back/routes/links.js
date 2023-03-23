const { Link } = require("../models/link");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Joi = require("joi");
var ImageKit = require("imagekit");
const axios = require("axios");

router.post("/", auth, async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const vid = await axios.get(`${req.body.videoUrl}`, {
    port: 3129,
  });
  const thumbnailIndex = vid.data.search("thumbnailUrl");
  const unCutImage = vid.data.slice(thumbnailIndex + 17, thumbnailIndex + 200);

  const image = getUrl(unCutImage);

  let link = new Link({
    linkId: Math.round(Math.random() * 10000),
    date: Date.now().toString(),
    name: req.body.name,
    link: req.body.link,
    userId: req.body.userId,
    image_preview: image,
  });
  link = await link.save();

  res.send({
    id: link.id,
    name: link.name,
    link: link.link,
  });
});

router.get("/", async (req, res) => {
  const Links = await Link.find().sort("name");
  res.send(Links);
});

router.get("/:id", async (req, res) => {
  const link = await Link.find({ userId: req.params.id }).sort("name");
  res.send(link);
});

router.delete("/:id", auth, async (req, res) => {
  const link = await Link.findByIdAndDelete(req.params.id);

  res.send(link);
});

const Schema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  link: Joi.string().min(20).max(1000).required(),
  userId: Joi.string().required(),
});

module.exports = router;
