var express = require("express");
var { getAll, getById, create, updateById } = require("../controllers/genre");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", verifyToken, isAdmin, create);
router.put("/update/:id", verifyToken, isAdmin, updateById);

module.exports = router;
