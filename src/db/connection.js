// Conexão com o Database
const Sequelize = require("sequelize");

const dbEnv = process.env.NODE_ENV;
console.log("Running on DB:", dbEnv);

let seqConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
    timezone: "-03:00",
  }
);

module.exports = seqConnection;
global.sequelize = seqConnection;
