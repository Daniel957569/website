const { Video } = require("../models/video");
const axios = require("axios");
const cheerio = require("cheerio");

function getUrl(video) {
  let videoString = "";
  for (let i = 0; i < video.length; i++) {
    if (video[i] !== '"') videoString += video.charAt(i);
    else return videoString;
  }
}

module.exports = async function () {
  setInterval(async () => {
    const date = new Date();

    if (
      date.getHours() === 6 ||
      date.getHours() === 20 ||
      date.getHours() === 16
    ) {
      // ddd
    }
  }, 4 * 72000);
};
