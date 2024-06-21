const dbConfig = require("./config/dbConfig");

const Sequelize = require("sequelize").Sequelize;
const DataTypes = require("sequelize").DataTypes;

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./model/userModel")(sequelize, Sequelize);
db.vote = require("./model/voteModel")(sequelize, Sequelize);
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
