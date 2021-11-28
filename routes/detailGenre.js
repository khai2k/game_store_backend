var express = require("express");
var { getAll, create } = require("../controllers/detailGenre");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.post("/create", verifyToken, isAdmin, create);

module.exports = router;
