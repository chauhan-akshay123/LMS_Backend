let { DataTypes, sequelize } = require("../lib/");

let students = sequelize.define("students", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { students };
