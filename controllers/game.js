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
    const game = await Game.findAll({
      include: [
        { model: Discount, as: "discount" },
        {
          model: DetailGenre,
          as: "genre",
          include: [
            {
              model: Genre,
              as: "idGenreNavigation",
            },
          ],
        },
        {
          model: ImageGameDetail,
          as: "imageGameDetail",
        },
      ],
    });
    return res.send(game);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {
        idGame: req.params.id,
      },
      include: [
        { model: Discount, as: "discount" },
        {
          model: DetailGenre,
          as: "genre",
          include: [
            {
              model: Genre,
              as: "idGenreNavigation",
            },
          ],
        },
        {
          model: ImageGameDetail,
          as: "imageGameDetail",
        },
      ],
    });
    if (!game) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.send(game);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    ///TODO create game and create version

    const game = new Game({
      idGame: uuidv4(),
      ...req.body,
    });
    await game.save();
    return res.send(game);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dataExists = await Game.findOne({
      where: { idGame: id },
    });
    if (!dataExists) {
      return res.status(404).send("Not found");
    }
    const data = new Game({
      idGame: id,
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
