const express = require("express");
const router = express.Router();
const ImageKit = require("imagekit");
const auth = require("../middleware/auth");
const { Image } = require("../models/image");
const { Customer } = require("../models/customer");

router.post("/imageUrl", auth, async (req, res) => {
  let image = new Image({
    imageId: Math.random() * 100,
    date: Date.now().toString(),
    name: req.body.name,
    description: req.body.description,
    userId: req.body.id,
    imageUrl: req.body.imageUrl,
  });
  image = await image.save();

  res.send({
    id: image.id,
    name: image.name,
    description: image.description,
    link: image.link,
    imageUrl: image.imageUrl,
  });
});

router.put("/imageUrl/:id", async (req, res) => {
  const user = await Customer.findByIdAndUpdate(
    req.params.id,
    { id: req.body.id, imageUrl: req.body.imageUrl },
    { new: true }
  );
  res.send(user);
});

router.get("/imageUrl/:id", async (req, res) => {
  const image = await Image.find({ _id: req.params.id }).sort("-date");
  res.send(image);
});

router.get("/images/:id", async (req, res) => {
  const image = await Image.find({ userId: req.params.id }).sort("-date");
  res.send(image);
});

router.get("/image", async (req, res) => {
  const image = await Image.find().sort("-date");
  res.send(image);
});

router.delete("/:id", async (req, res) => {
  const image = await Image.findByIdAndDelete(req.params.id);
  res.send(image);
});

router.put("/imageUrl", async (req, res) => {
  const Images = await Image.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.send(Images);
});

module.exports = router;
