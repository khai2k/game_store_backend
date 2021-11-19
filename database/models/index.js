const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize("game_store", "sa", "khai12345@", {
  host: "103.142.139.104",
  port: 1433,
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    options: { encrypt: true },
  },
});

// hooks fix count wrong when include M:N associations
sequelize.addHook("beforeCount", function (options) {
  if (this._scope.include && this._scope.include.length > 0) {
    options.distinct = true;
    options.col =
      this._scope.col || options.col || `"${this.options.name.singular}".id`;
  }

  if (options.include && options.include.length > 0) {
    options.include = null;
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

for (const file of fs.readdirSync(__dirname)) {
  if (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js"
  ) {
    // const model = sequelize.import(path.join(__dirname, file));
    var model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ;(async () => {
//   for (const file of fs.readdirSync(__dirname)) {
//     if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {
//       const model = sequelize.import(path.join(__dirname, file))
//       db[model.name] = model
//       await model.sync()
//     }
//   }

//   Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db)
//     }
//   })
// })()
(function tryConnect(count = 0) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
      console.log(`Unable to connect to the database (${count}): `, error);
      setTimeout(() => {
        tryConnect(++count);
      }, Math.max(count * 500, 5000));
    });
})();

module.exports = db;
