const { Comments } = require("../database/models");

const getAll = async (req, res, next) => {
  try {
    const data = await Comments.findAll();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await Comments.findOne({
      where: {
        idComment: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getCommentByIdGame = async (req, res, next) => {
  try {
    const data = await Comments.findAll({
      where: {
        idGame: req.params.id,
      },
    });
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getCommentCountByIdGame = async (req, res, next) => {
  try {
    const data = await Comments.count({
      where: {
        idGame: req.params.id,
      },
    });

    return res.status(200).send(data.toString());
  } catch (error) {
    next(error);
  }
};

const GetCommentOfGameOfUser = async (req, res, next) => {
  try {
    const data = await Comments.findAll({
      where: {
        idGame: req.params.idGame,
        idUser: req.params.idUser,
      },
    });

    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getCommentByIdGame,
  getCommentCountByIdGame,
  GetCommentOfGameOfUser,
};
