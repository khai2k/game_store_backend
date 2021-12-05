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
router.get("/", verifyToken, getAllUser);
router.get("/:idUser", verifyToken, getUserById);
router.put("/update/:idUser", verifyToken, updateUserById);

module.exports = router;
