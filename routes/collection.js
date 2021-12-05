var express = require("express");
var { GetAllCollection } = require("../controllers/collection");

var router = express.Router();

router.get("/:id", GetAllCollection);

module.exports = router;
