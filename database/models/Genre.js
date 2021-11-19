module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      idGenre: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameGenre: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return Genre;
};
