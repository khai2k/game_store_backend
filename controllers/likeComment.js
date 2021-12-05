const {
  Game,
  Discount,
  DetailGenre,
  Genre,
  ImageGameDetail,
  LikeComment,
} = require("../database/models");
const { v4: uuidv4 } = require("uuid");

const LikeCommentUserInComment = async (req, res, next) => {
  try {
    const data = await LikeComment.findOne({
      where: {
        idComment: req.params.idComment,
        idUser: req.params.idUser,
      },
    });
    if (!data) return res.send({ own: "none" });

    return res.send({ own: data.IsLike ? "1" : "0" });
  } catch (error) {
    next(error);
  }
};

const _formatData = (data) => {
  if (data[0].IsLike) {
    return {
      like: data[0].count,
      dislike: data[1].count,
    };
  }
  return {
    like: data[1].count,
    dislike: data[0].count,
  };
};
const GetCountLikeComment = async (req, res, next) => {
  try {
    const data = await LikeComment.count({
      attributes: ["IsLike"],
      where: {
        idComment: req.params.idComment,
      },
      group: ["IsLike"],
    });
    return res.send(_formatData(data));
  } catch (error) {
    next(error);
  }
};
module.exports = {
  LikeCommentUserInComment,
  GetCountLikeComment,
};
