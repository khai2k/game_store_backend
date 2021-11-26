module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      idUser: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      realName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      numberPhone: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      background: {
        type: DataTypes.STRING,
      },
      roles: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      // Other model options go here
    }
  );

  return Users;
};
