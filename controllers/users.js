const { Users } = require("../database/models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { pbkdf2Sync } = require("crypto");
const { generateToken } = require("../utils");

const hash = (data) => {
  const salt = new Buffer(16);
  const hash = pbkdf2Sync(data, salt, 100000, 32, "sha256").toString("base64");
  return hash;
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const hashPass = hash(password);
  const conditions = {
    [Op.or]: [{ email, password: hashPass }],
  };
  try {
    const user = await Users.findOne({ where: conditions });
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    const token = await generateToken(user);
    return res.status(200).send({
      userName: user.userName,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashPass = hash(password);
  console.log("🚀 ~ file: users.js ~ line 37 ~ register ~ hashPass", hashPass);
  try {
    const userExists = await Users.findOne({
      where: {
        [Op.or]: {
          userName,
          email,
        },
      },
    });
    if (userExists) {
      return res.status(403).send("UserName or Email exists");
    }

    const user = new Users({
      ...req.body,
      idUser: uuidv4(),
      password: hashPass,
    });

    await user.save();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    console.log("----------------");
    const users = await Users.findAll();
    return res.send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  console.log(req.params.idUser);
  try {
    const user = await Users.findOne({
      where: { idUser: req.params.idUser },
    });
    if (!user) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const dataExists = await Users.findOne({
      where: { idUser },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    const data = new Users({
      idUser,
      ...req.body,
    });
    console.log(data);
    await data.save();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  getAllUser,
  getUserById,
  updateUserById,
};
