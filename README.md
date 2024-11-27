---

# LMS Backend

A simple Learning Management System (LMS) backend built using Node.js, Express, Sequelize, and SQLite. This project allows you to manage students, courses, and their enrollments.

## Features

- Add, view, and manage students and courses.
- Enroll students in courses and fetch their enrollment details.
- Fetch all students in a specific course.
- Unenroll a student from a course.
- Persistent data storage using SQLite and Sequelize ORM.

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/lms-backend.git
   cd lms-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node index.js
   ```

4. **Access the application**:
   Open your browser or Postman and navigate to `http://localhost:3000`.

---

## Database

The application uses Sequelize ORM with SQLite for database management. The database schema includes the following models:

- **Students**: Represents individual students.
- **Courses**: Represents individual courses.
- **StudentCourses**: A many-to-many relationship table connecting students and courses.

---

## API Endpoints

### Health Check
**GET /**  
Checks if the server is running.  
**Response**:  
```json
{
  "message": "LMS Backend is running!"
}
```

---

### Students

- **Add a new student**  
  **POST /students/new**  
  **Request Body**:  
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "registration_date": "2024-01-01"
  }
  ```
  **Response**:  
  ```json
  {
    "message": "Student added successfully",
    "newStudent": { /* student details */ }
  }
  ```

- **Fetch all students**  
  **GET /students**  
  **Response**:  
  ```json
  {
    "students": [ /* array of students */ ]
  }
  ```

- **Fetch all courses for a student**  
  **GET /students/:id/courses**  
  **Response**:  
  ```json
  {
    "student": { /* student details */ },
    "courses": [ /* array of enrolled courses */ ]
  }
  ```

---

### Courses

- **Add a new course**  
  **POST /courses/new**  
  **Request Body**:  
  ```json
  {
    "title": "Introduction to Programming",
    "description": "Learn the basics of programming using Python.",
    "start_date": "2024-02-01",
    "end_date": "2024-05-01"
  }
  ```
  **Response**:  
  ```json
  {
    "message": "Course added successfully",
    "newCourse": { /* course details */ }
  }
  ```

- **Fetch all courses**  
  **GET /courses**  
  **Response**:  
  ```json
  {
    "courses": [ /* array of courses */ ]
  }
  ```

- **Fetch all students in a course**  
  **GET /courses/:id/students**  
  **Response**:  
  ```json
  {
    "course": { /* course details */ },
    "students": [ /* array of enrolled students */ ]
  }
  ```

---

### Enrollments

- **Enroll a student in a course**  
  **POST /enroll**  
  **Request Body**:  
  ```json
  {
    "studentId": 1,
    "courseId": 1
  }
  ```
  **Response**:  
  ```json
  {
    "message": "Student enrolled in course successfully",
    "enrollment": { /* enrollment details */ }
  }
  ```

- **Unenroll a student from a course**  
  **POST /unenroll**  
  **Request Body**:  
  ```json
  {
    "studentId": 1,
    "courseId": 1
  }
  ```
  **Response**:  
  ```json
  {
    "message": "Student unenrolled from course successfully"
  }
  ```

---

## Folder Structure

```plaintext
.
├── models
│   ├── students.model.js       # Defines the Students model
│   ├── courses.model.js        # Defines the Courses model
│   └── studentCourses.model.js # Defines the many-to-many relationship model
├── lib
│   └── index.js                # Database configuration
├── database.sqlite             # SQLite database file
├── index.js                    # Main entry point for the application
├── package.json                # Dependencies and project metadata
└── README.md                   # Project documentation
```

---

## Author

**Your Name**  
GitHub: [Akshay Chauhan](https://github.com/chauhan-akshay123)

---

## License

This project is licensed under the MIT License.

---

Let me know if you want any customization or additional sections!
