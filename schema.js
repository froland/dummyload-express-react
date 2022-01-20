var debug = require("debug")("exam-express-server:schema");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: (msg) => debug(msg),
});

const Instance = sequelize.define("Instance", {
  instanceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pingReceived: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    //await sequelize.sync();
  } catch (error) {
    console.error("Error with the database:", error);
  }
})();
