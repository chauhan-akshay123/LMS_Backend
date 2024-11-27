const express = require("express");
const { students } = require("./models/students.model");
const { courses } = require("./models/courses.model");
const { studentCourses } = require("./models/studentCourses.model");
const { sequelize } = require("./lib/");
const app = express();

app.use(express.json());

// Sync database
sequelize.sync({ force: false }) 
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "LMS Backend is running!" });
});

// Add a new student
app.post("/students/new", async (req, res) => {
  try {
    const { name, email, registration_date } = req.body;
    const newStudent = await students.create({ name, email, registration_date });
    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding a new student", error: error.message });
  }
});

// Add a new course
app.post("/courses/new", async (req, res) => {
  try {
    const { title, description, start_date, end_date } = req.body;
    const newCourse = await courses.create({ title, description, start_date, end_date });
    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding a new course", error: error.message });
  }
});

// Enroll a student in a course
app.post("/enroll", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await students.findByPk(studentId);
    const course = await courses.findByPk(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }

    const enrollment = await studentCourses.create({ studentId, courseId });
    res.status(201).json({ message: "Student enrolled in course successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling a student in a course", error: error.message });
  }
});

// Fetch all students
app.get("/students", async (req, res) => {
  try {
    const allStudents = await students.findAll();
    if (allStudents.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }
    return res.status(200).json({ students: allStudents });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// Fetch all courses
app.get("/courses", async (req, res) => {
   try{
     const allCourses = await courses.findAll();
     if(allCourses.length === 0){
        return res.status(404).json({ message: "No courses found." });
     }
     return res.status(200).json({ courses: allCourses });
   } catch(error){
    return res.status(500).json({ message: "Error fetching courses", error: error.message });
   }
});

// Fetch all courses for a student
app.get("/students/:id/courses", async (req, res) => {
    try {
      const { id } = req.params; 
      const studentDetails = await students.findByPk(id, {
        include: courses, 
      });
  
      if (!studentDetails) {
        return res.status(404).json({ message: "Student not found." });
      }
  
      return res.status(200).json({
        student: {
          id: studentDetails.id,
          name: studentDetails.name,
          email: studentDetails.email,
        },
        courses: studentDetails.courses.map(course => ({
          id: course.id,
          title: course.title,
          description: course.description,
          start_date: course.start_date,
          end_date: course.end_date,
        })),
      });
    } catch (error) {
      console.error("Error fetching the courses for the student:", error);
      return res.status(500).json({ message: "Error fetching the courses for the student", error: error.message });
    }
  });

  app.get("/courses/:id/students", async (req, res) => {
    try {
      const { id } = req.params;
      const courseDetails = await courses.findByPk(id, {
        include: students, 
      });
  
      if (!courseDetails) {
        return res.status(404).json({ message: "Course not found." });
      }
  
      return res.status(200).json({
        course: {
          id: courseDetails.id,
          title: courseDetails.title,
          description: courseDetails.description,
        },
        students: courseDetails.students.map(student => ({
          id: student.id,
          name: student.name,
          email: student.email,
        })),
      });
    } catch (error) {
      console.error("Error fetching students for the course:", error);
      return res.status(500).json({ message: "Error fetching students for the course", error: error.message });
    }
  });
  
  app.post("/unenroll", async (req, res) => {
    try {
      const { studentId, courseId } = req.body; 
      
      const enrollment = await studentCourses.findOne({
        where: {
          studentId,
          courseId,
        },
      });
  
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found." });
      }
  
      await enrollment.destroy();
      return res.status(200).json({ message: "Student unenrolled from course successfully" });
    } catch (error) {
      console.error("Error unenrolling student from course:", error);
      return res.status(500).json({ message: "Error unenrolling student from course", error: error.message });
    }
  });
  
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
