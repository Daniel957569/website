const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Video } = require("../models/video");
const _ = require("lodash");
const cheerio = require("cheerio");

router.post("/", async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAAMmigAEAAAAA0oWf2tjM3fGXuTkL6xW3sLNt1OI%3De5BbSGb0vob2ZlsogcMkVJaYvFDzGQYzp1UQlnCB1BJEijfdoG",
      },
    };
    const data = await axios.get(
      `https://api.twitter.com/2/tweets?ids=${req.body.tweetId}&expansions=attachments.media_keys&media.fields=variants`,
      config
    );
    const videos = data.data.includes.media[0].variants;
    const urls = [];
    for (let v in videos) {
      urls.push(videos[v].bit_rate);
    }
    const maxNum = _.max(urls);
    const index = urls.indexOf(maxNum);

    res.send(data.data.includes.media[0].variants[index].url);
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;

// <ul id="fruits">
//   <li class="apple">Apple</li>
//   <li class="orange">Orange</li>
//   <li class="pear">Pear</li>

// </ul>
