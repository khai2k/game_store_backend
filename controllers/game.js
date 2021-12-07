const {
  Game,
  Discount,
  DetailGenre,
  Genre,
  ImageGameDetail,
  GameVersion,
} = require("../database/models");
const { v4: uuidv4 } = require("uuid");

const getAll = async (req, res, next) => {
  try {
    const data = await Game.findAll({
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
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await Game.findOne({
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
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { game, gameversion, listimagedetail, listgenredetail } = req.body;
  try {
    const idGame = uuidv4();
    const idGameVersion = uuidv4();
    const releaseDate = new Date(Date.now()).toISOString();
    const dateUpdate = releaseDate;

    const gameVersionData = new GameVersion({
      ...gameversion,
      idGame,
      idGameVersion,
      dateUpdate,
    });
    for (const idGenre of listgenredetail) {
      const existGenre = await Genre.findOne({ where: { idGenre } });
      if (!existGenre)
        return res.status(404).send({ message: idGenre + " not found" });
    }

    const newListGenreDetail = listgenredetail.map((item) => {
      return {
        idGame,
        idGenre: item,
      };
    });
    const gameData = new Game({
      ...game,
      idGame,
      numberOfBuyer: 0,
      numberOfDownloaders: 0,
      numOfRate: 0,
      releaseDate,
    });
    await gameData.save();
    await gameVersionData.save();

    await DetailGenre.bulkCreate(newListGenreDetail);
    const newListImage = listimagedetail.map((item) => {
      return {
        idGame,
        url: item,
        idImage: uuidv4(),
      };
    });
    await ImageGameDetail.bulkCreate(newListImage);

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
    await Game.update({ ...req.body }, { where: { idGame: id } });
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
