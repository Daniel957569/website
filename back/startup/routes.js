const express = require("express");
const customers = require("../routes/customers");
const links = require("../routes/links");
const images = require("../routes/images");
const videos = require("../routes/videos");
const imageKit = require("../routes/imageKit");
const chats = require("../routes/chat");
const twitterAPI = require("../routes/twitterAPI");
const auth = require("../routes/auth");
require("./scheduledUpdate");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/customers/", customers);
  app.use("/api/links/", links);
  app.use("/api/auth/", auth);
  app.use("/api/image/", images);
  app.use("/api/imageKit/", imageKit);
  app.use("/api/video/", videos);
  app.use("/api/chat/", chats);
  app.use("/api/twitterAPI/", twitterAPI);
};

// app.use(function(req, res, next) {
//   res.header("access-control-allow-origin", "*"),
//   res.header('Access-Control-Allow-Headers', '*')
//   res.header('Access-Control-Allow-Methods', '*'),
//   res.header('Access-Control-Allow-Headers", "Content-Type')
//   next();
// });
