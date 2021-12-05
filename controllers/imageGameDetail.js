const {
  Game,
  Discount,
  DetailGenre,
  Genre,
  ImageGameDetail,
} = require("../database/models");
const { v4: uuidv4 } = require("uuid");

const getAll = async (req, res, next) => {
  try {
    const data = await ImageGameDetail.findAll({});
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new ImageGameDetail({
      idImage: uuidv4(),
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
