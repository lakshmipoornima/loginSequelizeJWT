const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "UserLogin",
  "poornimalaptop",
  "poornima8240",
  {
    host: "127.0.0.1",
    dialect: "mssql",
    port:55290
  }
);

sequelize.sync({force:true});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
