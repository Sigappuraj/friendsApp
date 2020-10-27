const { DataTypes } = require("sequelize");
const studentDb = require("../config/studentDb");

const Users = studentDb.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING
    }
});

module.exports = Users;