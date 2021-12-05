module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
    "Collection",
    {
      idGame: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      isIntalled: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  Collection.associate = function (models) {
    Collection.hasOne(models.Users, {
      sourceKey: "idUser",
      foreignKey: "idUser",
      as: "user",
    });
    Collection.hasOne(models.Game, {
      sourceKey: "idGame",
      foreignKey: "idGame",
      as: "listGame",
    });
  };
  return Collection;
};
