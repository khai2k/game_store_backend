var express = require("express");
var {
  getAll,
  getById,
  getCommentByIdGame,
  getCommentCountByIdGame,
} = require("../controllers/comments");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getCommentByIdGame);
router.get("/count/:id", getCommentCountByIdGame);

module.exports = router;
