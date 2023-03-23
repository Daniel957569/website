const axios = require("axios");
const cheerio = require("cheerio");
var ImageKit = require("imagekit");
var fs = require("fs");

// https://www.xvideos.com/video37967091/18_yo_asian_pinoy_amf_fucks_his_first_american_girl

async function test() {
  const vid = await axios.get(
    "https://hqporner.com/hdporn/90015-its_wrong_youre_my_stepson.html"
  );
  const str = vid.data.slice(9000, 9400);
  const videoStr = str.slice(str.search("src") + 5, str.search("src") + 100);
  const index = vid.data.search("preload_");

  function getUrl(video) {
    let videoString = "";
    for (let i = 0; i < video.length; i++) {
      if (video[i] !== '"') videoString += video.charAt(i);
      else return videoString;
    }
  }
  const videoString = "https:" + getUrl(videoStr);

  const vid2 = await axios.get(videoString);

  const index2 = vid2.data.search("poster");

  function getVideoUrl(video) {
    let videoString = "";
    for (let i = 0; i < video.length; i++) {
      if (video[i] !== '"') videoString += video.charAt(i);
      else return videoString;
    }
  }

  function getImagePreview(video) {
    let videoString = "";
    for (let i = 0; i < video.length; i++) {
      if (video[i] !== '"') videoString += video.charAt(i);
      else return videoString;
    }
  }
  const imageUrl = getImagePreview(vid2.data.slice(index2 + 9, index2 + 100));

  console.log(imageUrl.slice(0, imageUrl.length - 1));
}

// test();

async function test2() {
  setInterval(() => {
    const date = new Date();

    console.log(date.getSeconds());
    if (date.getSeconds() > 10 && date.getSeconds() < 20) {
      console.log("success");
      const date1 = new Date();
    }
  }, 10000);
}

test2();
