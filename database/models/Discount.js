module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      idDiscount: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      percentDiscount: {
        type: DataTypes.FLOAT,
      },
      title: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.STRING,
      },
      endDate: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return Discount;
};
