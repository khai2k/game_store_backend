const { Suggestion } = require("../database/models");
const { v4: uuidv4 } = require("uuid");

const getAll = async (req, res, next) => {
  try {
    const data = await Suggestion.findAll();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new Genre({
      idSuggestion: uuidv4(),
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
    const dataExists = await Genre.findOne({
      where: { idGenre: id },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    await Genre.update({ ...req.body }, { where: { idGenre: id } });
    return res.send(req.body);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  updateById,
};
