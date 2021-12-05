var express = require("express");
var {
  GetCountLikeComment,
  LikeCommentUserInComment,
} = require("../controllers/likeComment");

var router = express.Router();

router.get("/:idComment", GetCountLikeComment);
router.get("/:idComment/:idUser", LikeCommentUserInComment);

module.exports = router;
