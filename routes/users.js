var express = require("express");
var {
  login,
  getAllUser,
  register,
  getUserById,
  updateUserById,
} = require("../controllers/users");

var router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", getAllUser);
router.get("/:idUser", getUserById);
router.put("/:idUser", updateUserById);

module.exports = router;
