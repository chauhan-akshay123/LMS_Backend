let { DataTypes, sequelize } = require("../lib/");

let courses = sequelize.define("courses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
});

module.exports = { courses };
