# Education Management App - Backend

The backend for the Education Management App offers role-based features for managing users, courses, enrollments, grades, and assignments. It also provides course analytics using Node.js, Express.js, and MongoDB.

## Features

- **User Authentication & Authorization**: Role-based access (Admin, Teacher, Student).
- **Course Management**: CRUD operations for courses.
- **Enrollment Management**: Admin-managed enrollments, students can self-enroll.
- **Grade Management**: Teachers can assign grades; students can view their grades.
- **Assignment Management**: Teachers upload, students submit.
- **Course Analytics**: Provides insights using MongoDB aggregations.

## Technologies

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: ORM for MongoDB.
- **JWT**: JSON Web Token for authentication.
- **Multer**: File handling middleware.
- **dotenv**: Manages environment variables.

## API Endpoints

### User Routes

- **POST /user/signup**: Register users with roles.
- **POST /user/login**: User login.

### Course Routes

#### Admin
- **POST /course/admin/add**: Add a course.
- **GET /course/admin/get**: List all courses.
- **GET /course/admin/get/:id**: Get course by ID.
- **PATCH /course/admin/update/:id**: Update course.
- **DELETE /course/admin/delete/:id**: Delete course.

#### Teacher
- **POST /course/:courseId/assignment**: Upload assignment.
- **POST /course/:courseId/quiz**: Add quiz.

#### Student
- **GET /course/get**: List all courses.
- **POST /course/:courseId/enroll**: Enroll in a course.
- **POST /course/:courseId/assignments/:assignmentId/submit**: Submit assignment.

### Enrollment Routes

#### Admin
- **POST /enrollments/enroll**: Enroll a student.
- **POST /enrollments/remove**: Remove a student.

#### Student
- **GET /enrollments/my_enrollments**: View enrolled courses.

### Grade Routes

#### Teacher
- **POST /grades/assign**: Assign grades to students.

#### Student
- **GET /grades/my_grades**: View own grades.

### Analytics Routes

#### Student
- **GET /analytics/total_students/:courseId**: Get total students in a course.
- **GET /analytics/average_grade/:studentId**: Get average grade per course.

## Requirements

- **Node.js** (v12+)
- **MongoDB** (local or MongoDB Atlas)

## Installation

1. Clone the repository:
   git clone <repository-url>


Steps Overview:
Clone the repository: git clone.
Install dependencies: npm install.
Create .env: Add your MongoDB connection string.
Start MongoDB: Ensure MongoDB is running (if local).
Run server: node index.js or nodemon (if nodemon installed).
