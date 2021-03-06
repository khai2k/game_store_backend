module.exports = (sequelize, DataTypes) => {
  const GameVersion = sequelize.define(
    "GameVersion",
    {
      idGameVersion: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      idGame: {
        type: DataTypes.STRING,
      },
      versionGame: {
        type: DataTypes.STRING,
      },
      dateUpdate: {
        type: DataTypes.STRING,
      },
      urlDowload: {
        type: DataTypes.STRING,
      },
      shortDescription: {
        type: DataTypes.STRING,
      },
      descriptions: {
        type: DataTypes.STRING,
      },
      requires: {
        type: DataTypes.STRING,
      },
      os: {
        type: DataTypes.STRING,
      },
      processor: {
        type: DataTypes.STRING,
      },
      storage: {
        type: DataTypes.STRING,
      },
      directX: {
        type: DataTypes.STRING,
      },
      graphics: {
        type: DataTypes.STRING,
      },
      privacyPolicy: {
        type: DataTypes.STRING,
      },
      memory: {
        type: DataTypes.STRING,
      },
      filePlay: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      hasTrigger: true,
      // Other model options go here
    }
  );

  return GameVersion;
};
