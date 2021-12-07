const { v4: uuidv4 } = require("uuid");

const {
  Game,
  Discount,
  DetailGenre,
  Genre,
  ImageGameDetail,
  Bill,
  Users,
} = require("../database/models");
// const { Op } = require("sequelize");

const getAll = async (req, res, next) => {
  try {
    const data = await Bill.findAll({});
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new Bill({
      idBill: uuidv4(),
      ...req.body,
    });
    await data.save();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
