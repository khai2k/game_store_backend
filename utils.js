const jwt = require("jsonwebtoken");
const JWT_SECRET = "zxcasdqwe123zxcasdqwe123zxcasdqwe123zxcasdqwe123";
const tokenLife = "1d";

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

module.exports = { extractToken, generateToken };
