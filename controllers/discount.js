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
    const data = await Discount.findAll();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await Bill.findAll({
      where: { idDiscount: req.params.id },
    });
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new Bill({
      idDiscount: uuidv4(),
      ...req.body,
    });
    await data.save();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataExists = await Discount.findOne({
      where: { idDiscount: id },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    const data = new Discount({
      idDiscount: id,
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
  getAll,
  getById,
  create,
  updateById,
};
