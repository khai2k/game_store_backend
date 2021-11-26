const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils");

const JWT_SECRET = "secret";
const tokenLife = "1d";

const verifyToken = (req, res, next) => {
  //   const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const token = extractToken(req);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const isAdmin = (req, res, next) => {
  const { data } = req.user;
  if (data.roles === "admin") return next();
  return res.status(403).send("user is not admin");
};

module.exports = {
  verifyToken,
  isAdmin,
};
