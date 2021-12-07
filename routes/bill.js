var express = require("express");
var { getAll, getById, create, updateById } = require("../controllers/bill");

var router = express.Router();

router.get("/", getAll);
router.post("/", create);

module.exports = router;
