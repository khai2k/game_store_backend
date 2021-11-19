module.exports = (sequelize, DataTypes) => {
  const SlideGameHot = sequelize.define(
    "SlideGameHot",
    {
      idGame: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      urlVideo: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return SlideGameHot;
};
