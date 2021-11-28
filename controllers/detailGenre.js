const { DetailGenre } = require("../database/models");

const getAll = async (req, res, next) => {
  try {
    const data = await DetailGenre.findAll();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new DetailGenre({
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
