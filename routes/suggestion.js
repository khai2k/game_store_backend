var express = require("express");
var { getAll, create, updateById } = require("../controllers/suggestion");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", verifyToken, isAdmin, getAll);
router.post("/create", verifyToken, isAdmin, create);
router.put("/update/:id", verifyToken, isAdmin, updateById);

module.exports = router;
