const express = require("express");
const router = express.Router();
const ImageKit = require("imagekit");
const auth = require("../middleware/auth");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/n5ptomljd",
  publicKey: "public_Ya9B75ifvPIaFRub32k0cljsdiU=",
  privateKey: "private_hj/B/L4xn4NMghQQ7eeMt0/likM=",
});

router.get("/", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

module.exports = router;
