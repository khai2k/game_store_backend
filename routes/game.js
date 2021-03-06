var express = require("express");
var { getAll, getById, create, updateById } = require("../controllers/game");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", create);
router.put("/update/:id", updateById);
module.exports = router;
