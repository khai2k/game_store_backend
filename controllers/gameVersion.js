const { GameVersion, ImageGameDetail, Game } = require("../database/models");
const { v4: uuidv4 } = require("uuid");
const CircularJSON = require("circular-json");

const getAll = async (req, res, next) => {
  try {
    const data = await GameVersion.findAll();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = new GameVersion({
      idGameVersion: uuidv4(),
      ...req.body,
    });
    await data.save();
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const GetVersionByIdGame = async (req, res, next) => {
  try {
    const data = await GameVersion.findAll({
      where: {
        idGame: req.params.id,
      },
    });
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const GetNewVersionByIdGame = async (req, res, next) => {
  try {
    const allVersions = await GameVersion.findAll({
      where: {
        idGame: req.params.id,
      },
      order: [["versionGame", "DESC"]],
    });
    const newVersion = allVersions[0];

    const data = await Game.findOne({
      where: {
        idGame: req.params.id,
      },
      include: [{ model: ImageGameDetail, as: "imageGameDetail" }],
    });

    console.log(newVersion.toJ);
    const newData = {
      ...JSON.parse(CircularJSON.stringify(data)),
      newVersion: JSON.parse(CircularJSON.stringify(newVersion)),
    };
    return res.send(newData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  GetVersionByIdGame,
  GetNewVersionByIdGame,
};
