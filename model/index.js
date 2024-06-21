const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./userModel")(sequelize, Sequelize);
db.Vote = require("./voteModel")(sequelize, Sequelize);

db.User.hasOne(Vote, { foreignKey: "user_id" });
db.Vote.belongsTo(User, { foreignKey: "user_id" });

module.exports = db;
