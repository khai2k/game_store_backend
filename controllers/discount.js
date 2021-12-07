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
    const data = await Discount.findOne({
      where: { idDiscount: req.params.id },
    });
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { discount, listgamediscount } = req.body;
    const idDiscount = uuidv4();

    const data = new Discount({
      idDiscount,
      ...discount,
    });

    for (const idGame of listgamediscount) {
      const existGame = await Game.findOne({ where: { idGame } });
      if (!existGame)
        return res.status(404).send({ message: idGame + " not found" });
    }

    await data.save();
    await Game.update({ idDiscount }, { where: { idGame: listgamediscount } });

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { discount, listgamediscount } = req.body;
  try {
    const dataExists = await Discount.findOne({
      where: { idDiscount: id },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    await Game.update({ idDiscount: null }, { where: { idDiscount: id } });

    for (const idGame of listgamediscount) {
      const existGame = await Game.findOne({ where: { idGame } });
      if (!existGame)
        return res.status(404).send({ message: idGame + " not found" });
    }

    await Game.update(
      { idDiscount: id },
      { where: { idGame: listgamediscount } }
    );

    await Discount.update({ ...discount }, { where: { idDiscount: id } });
    return res.send(discount);
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
