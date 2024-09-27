const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const userRouter = require("./routes/user.route")
const connect = require("./config/db")
const courseRouter = require("./routes/course.route")
const {auth} = require("./middleware/auth.middleware")
const enrollmentRouter = require("./routes/enrollment.route")
const gradeRouter = require("./routes/grade.route")
const aggregationRouter = require("./routes/aggregation.route")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT

const teacherAssignmentDir = path.join(__dirname, 'uploads', 'teacher_assignment');
if (!fs.existsSync(teacherAssignmentDir)) {
  fs.mkdirSync(teacherAssignmentDir, { recursive: true });
}

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use("/user", userRouter);
app.use("/course", auth, courseRouter);
app.use("/enrollments", auth, enrollmentRouter);
app.use("/grades", auth, gradeRouter);
app.use("/analytics",auth,aggregationRouter)

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
    connect()
})