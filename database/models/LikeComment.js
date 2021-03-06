module.exports = (sequelize, DataTypes) => {
  const LikeComment = sequelize.define(
    "LikeComment",
    {
      idComment: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      IsLike: {
        type: DataTypes.BIGINT,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return LikeComment;
};
