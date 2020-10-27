const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

const studentDb = new Sequelize(process.env.DB_URL);

(async() => {
    try {
        await studentDb.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = studentDb;