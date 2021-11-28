var express = require("express");
var {
  getAll,
  create,
  GetVersionByIdGame,
  GetNewVersionByIdGame,
} = require("../controllers/gameVersion");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.post("/create", verifyToken, isAdmin, create);
router.get("/by-game/:id", verifyToken, isAdmin, GetVersionByIdGame);
router.get("/by-game/new-version/:id", GetNewVersionByIdGame);

module.exports = router;
