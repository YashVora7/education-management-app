# Education Management App - Backend
This is the backend for the Education Management App. It provides CRUD (Create, Read, Update, Delete) operations for courses to admin. It handles user authentication and authorization, course management by admin, teacher, student with respective permissions, enrollment management, grade management and also provides course analytics using Node.js, Express.js, and MongoDB (Mongoose for schema definition).

Features:
User Authentication
It provides CRUD (Create, Read, Update, Delete) operations for courses to admin.
User authentication and authorization.
Role-based permissions to access and authorization (Admin,Teacher,Student).
Course management.
Enrollment management.
Grade management.
It handles assignment upload and submit by teacher and student respectively
Course Analytics.
Statistics Using Aggregation

Technologies Used:
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework to handle routes and middleware.
MongoDB: NoSQL database for storing.
Mongoose: ORM for MongoDB, used to define the schema and interact with the database.
dotenv: For managing environment variables.
JWT: Json-web-token for creating and verify token
Multer: Middleware and configuration to handle files

Api Endpoints:
User Routes:

POST /user/signup: Register user with role
POST /user/login: Login user with proper validation

Course Routes:

Accessible to Admin-
POST /course/admin/add: Add a new course.
GET /course/admin/get: Fetch all courses.
GET /course/admin/get/:id: Fetch a course by its ID.
PATCH /course/admin/update/:id: Update a course by its ID.
DELETE /course/admin/delete/:id: Delete a course by its ID.

Accessible to Teacher-
POST /course/:courseId/assignment: With file upload validation.
POST /course/:courseId/quiz: Add Quiz

Accessible to Student-
GET /course/get: Getting Course
POST /course/:courseId/enroll: To enroll in course
POST /course/:courseId/assignments/:assignmentId/submit: To submit assignment file of student with validation

Enrollment Routes:

Accessible to Admin-
POST /enrollments/enroll: Enroll Student By Admin
POST /enrollments/remove: Remove Student By Admin

Accessible to Student-
GET /enrollments/my_enrollments: Get enrolled courses by student

Grade Routes:

Accessible to Teacher-
POST /grades/assign: To assign grade to students

Accessible to Student-
GET /grades/my_grades: Get grades of student

Analytics Routes:

Accessible to Student-
GET /analytics/total_students/:courseId: Fetch counts of students from course
GET /analytics/average_grade/:studentId: Fetch average of student's grade from course all grades 

Requirements
To run this project locally, ensure you have the following installed:

Node.js (v12+): Install Node.js
MongoDB: Install MongoDB locally or use a MongoDB cloud service like MongoDB Atlas.

Installation:
Clone the repository to your local machine.

Steps Overview:
Clone the repository: git clone.
Install dependencies: npm install.
Create .env: Add your MongoDB connection string.
Start MongoDB: Ensure MongoDB is running (if local).
Run server: node index.js or nodemon (if nodemon installed).