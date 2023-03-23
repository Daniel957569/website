const { Chat } = require("../models/chat");
const axios = require("axios");
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.post("/", async (req, res) => {
  messgae = new Chat({
    text: req.body.text,
    sender: req.body.sender,
    recevier: req.body.recevier,
  });

  messgae = await messgae.save();

  res.send({
    text: messgae.text,
    sender: messgae.sender,
    recevier: messgae.recevier,
  });
});

router.post("/something", async (req, res) => {
  const some = await axios.post(
    "http://127.0.0.1:8000/message",
    new URLSearchParams({
      room: "lobby",
      username: "daniel",
      message: "test?, did it work?",
    }),
    "Access-Control-Allow-Origin: *"
  );

  console.log(some);
  res.status(200).send("good");
});

router.get("/:id", async (req, res) => {
  const message = await Chat.find({ recevier: req.params.id });
  res.send(message);
});

module.exports = router;
