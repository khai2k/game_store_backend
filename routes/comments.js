var express = require("express");
var {
  getAll,
  getById,
  getCommentByIdGame,
  getCommentCountByIdGame,
  GetCommentOfGameOfUser,
} = require("../controllers/comments");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getCommentByIdGame);
router.get("/count/:id", getCommentCountByIdGame);
router.get("/:idGame/:idUser", GetCommentOfGameOfUser);

module.exports = router;
