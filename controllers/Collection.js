const {
  Game,
  Discount,
  DetailGenre,
  ImageGameDetail,
  Collection,
  Users,
  Genre,
} = require("../database/models");
const CircularJSON = require("circular-json");

const _formatDataGetAllCollection = (data) => {
  let newListGame = [];
  data.forEach((item) => {
    const newGame = { isIntalled: item.isIntalled, game: item.listGame };
    newListGame.push(newGame);
  });
  const newData = {
    user: data[0].user,
    listGame: newListGame,
  };
  return newData;
};

const GetAllCollection = async (req, res, next) => {
  try {
    const data = await Collection.findAll({
      where: {
        idUser: req.params.id,
      },
      include: [
        { model: Users, as: "user" },
        {
          model: Game,
          as: "listGame",
          include: [
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
        },
      ],
    });
    let dataJson = JSON.parse(CircularJSON.stringify(data));
    if (dataJson.length === 0) return res.send(dataJson);
    return res.send(_formatDataGetAllCollection(dataJson));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetAllCollection,
};
