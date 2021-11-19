var express = require("express");
var { getAll, getById, create, updateById } = require("../controllers/game");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/", updateById);
module.exports = router;
