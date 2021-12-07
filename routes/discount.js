var express = require("express");
var {
  getAll,
  getById,
  create,
  updateById,
} = require("../controllers/discount");
var { verifyToken, isAdmin } = require("../middlewares/auth");

var router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", verifyToken, isAdmin, create);
router.put("/update/:id", verifyToken, updateById);

module.exports = router;
