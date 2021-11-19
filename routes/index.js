var express = require("express");
var router = express.Router();
/* GET home page. */
router.post("/", (req, res) => {
  return res.send("ok");
});

module.exports = router;
