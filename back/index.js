const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
cors = require("cors");
const app = express().use("*", cors());

require("./startup/routes")(app);
require("./startup/scheduledUpdate")();

// "mongodb+srv://daniel:q67k4ggsx@cluster1.nxur2z5.mongodb.net/?retryWrites=true&w=majority" ||
mongoose
  .connect("mongodb://localhost:27017/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connecting to mongoose..."));

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

console.log("worked?");

module.exports = server;
