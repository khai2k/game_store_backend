module.exports = (sequelize, DataTypes) => {
  const ImageGameDetail = sequelize.define(
    "ImageGameDetail",
    {
      idImage: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idGame: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return ImageGameDetail;
};
