var express = require("express");
var {
  login,
  getAllUser,
  register,
  getUserById,
  updateUserById,
} = require("../controllers/users");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", verifyToken, isAdmin, getAllUser);
router.get("/:idUser", verifyToken, isAdmin, getUserById);
router.put("update/:idUser", verifyToken, isAdmin, updateUserById);

module.exports = router;
