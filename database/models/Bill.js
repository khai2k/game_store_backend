module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define(
    "Bill",
    {
      idBill: {
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
      datePay: {
        type: DataTypes.DATE,
      },
      cost: {
        type: DataTypes.FLOAT,
      },
      actions: {
        type: DataTypes.STRING,
      },
      discount: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  Bill.associate = function (models) {
    Bill.belongsTo(models.Game, {
      foreignKey: "idGame",
      targetKey: "idGame",
      as: "game",
    });
    Bill.belongsTo(models.Users, {
      sourceKey: "idUser",
      foreignKey: "idUser",
      as: "user",
    });
  };

  return Bill;
};
