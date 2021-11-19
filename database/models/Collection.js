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
      isInstalled: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return Collection;
};
