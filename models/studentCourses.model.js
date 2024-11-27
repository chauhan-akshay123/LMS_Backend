let { DataTypes, sequelize } = require("../lib/");
let { students } = require("./students.model");
let { courses } = require("./courses.model");

const studentCourses = sequelize.define("studentCourses", {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: students,
      key: "id",
    },
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: courses,
      key: "id",
    },
    allowNull: false,
  },
});

// Associations
students.belongsToMany(courses, { through: studentCourses });
courses.belongsToMany(students, { through: studentCourses });

module.exports = { studentCourses };
