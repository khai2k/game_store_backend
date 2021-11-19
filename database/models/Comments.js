module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      idComment: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idGame: {
        type: DataTypes.STRING,
      },
      idUser: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
      dislike: {
        type: DataTypes.INTEGER,
      },
      time: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return Comments;
};
