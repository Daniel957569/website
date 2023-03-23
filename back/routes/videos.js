const axios = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Video } = require("../models/video");
const cheerio = require("cheerio");
var ImageKit = require("imagekit");

router.post("/videoUrl", auth, async (req, res) => {
  let video = new Video({
    videoId: Math.random() * 100,
    date: Date.now().toString(),
    name: req.body.name,
    description: req.body.description,
    userId: req.body.id,
    videoUrl: req.body.videoUrl,
  });
  video = await video.save();

  res.send({
    id: video.id,
    name: video.name,
    description: video.description,
    link: video.link,
    videoUrl: video.videoUrl,
  });
});

router.get("/videoUrl/:id", async (req, res) => {
  const videos = await Video.find({ _id: req.params.id }).sort("-date");
  res.send(videos);
});
router.get("/videos/:id", async (req, res) => {
  const videos = await Video.find({ userId: req.params.id }).sort("-date");
  res.send(videos);
});

router.get("/videos", async (req, res) => {
  const videos = await Video.find().sort("-date");
  res.send(videos);
});

router.delete("/:id", async (req, res) => {
  const videos = await Video.findByIdAndDelete(req.params.id);
  res.send(videos);
});

module.exports = router;
