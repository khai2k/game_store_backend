module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define(
    "Suggestion",
    {
      idSuggestion: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      // Other model options go here
    }
  );

  return Suggestion;
};
