module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      idGame: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idDiscount: {
        type: DataTypes.STRING,
      },
      nameGame: {
        type: DataTypes.STRING,
      },
      averageRate: {
        type: DataTypes.FLOAT,
      },
      numOfRate: {
        type: DataTypes.INTEGER,
      },
      developer: {
        type: DataTypes.STRING,
      },
      publisher: {
        type: DataTypes.STRING,
      },
      releaseDate: {
        type: DataTypes.STRING,
      },
      plaform: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.INTEGER,
      },
      lastestVersion: {
        type: DataTypes.STRING,
      },
      numberOfBuyer: {
        type: DataTypes.INTEGER,
      },
      numberOfDownloaders: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  Game.associate = function (models) {
    Game.belongsTo(models.Discount, {
      foreignKey: "idDiscount",
      targetKey: "idDiscount",
      as: "discount",
    });
    Game.hasMany(models.DetailGenre, {
      sourceKey: "idGame",
      foreignKey: "idGame",
      as: "genre",
    });
    Game.hasMany(models.ImageGameDetail, {
      sourceKey: "idGame",
      foreignKey: "idGame",
      as: "imageGameDetail",
    });
    Game.hasMany(models.GameVersion, {
      sourceKey: "idGame",
      foreignKey: "idGame",
      as: "newVersion",
    });
  };

  return Game;
};
