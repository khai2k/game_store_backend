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
    const data = await Bill.findAll({
      include: [
        { model: Game, as: "game" },
        {
          model: Users,
          as: "user",
        },
      ],
    });
    const dataFormat = data.map((item) => {
      item.dataValues["discountApplied"] = JSON.parse(item.discount);
      delete item.dataValues.discount;

      return item;
    });
    return res.send(dataFormat);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await Bill.findAll({
      where: { idBill: req.params.id },
      include: [
        { model: Game, as: "game" },
        {
          model: Users,
          as: "user",
        },
      ],
    });

    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    const dataFormat = data.map((item) => {
      item.dataValues["discountApplied"] = JSON.parse(item.discount);
      delete item.dataValues.discount;

      return item;
    });

    return res.send(dataFormat);
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

const updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataExists = await Bill.findOne({
      where: { idBill: id },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    await Bill.update({ ...req.body }, { where: { idBill: id } });
    return res.send(req.body);
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
