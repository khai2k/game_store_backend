var express = require("express");
var { getAll, create } = require("../controllers/imageGameDetail");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.post("/create", create);

module.exports = router;
