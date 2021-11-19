module.exports = (sequelize, DataTypes) => {
  const DetailGenre = sequelize.define(
    "DetailGenre",
    {
      idGenre: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idGame: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  DetailGenre.associate = function (models) {
    DetailGenre.belongsTo(models.Game, {
      foreignKey: "idGame",
      targetKey: "idGame",
      as: "game",
    });
  };

  DetailGenre.associate = function (models) {
    DetailGenre.belongsTo(models.Genre, {
      foreignKey: "idGenre",
      targetKey: "idGenre",
      as: "idGenreNavigation",
    });
  };

  return DetailGenre;
};
