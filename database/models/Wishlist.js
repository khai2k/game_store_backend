module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define(
    "WishList",
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
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return WishList;
};
