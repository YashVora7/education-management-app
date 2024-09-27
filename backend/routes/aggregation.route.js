const {Router} = require("express")
const { adminAuth } = require("../middleware/auth.middleware")
const { getEnrolledStudentCount, getAverageGradePerCourse } = require("../controllers/aggregation.controller")
const aggregationRouter = Router()

aggregationRouter.get("/total_students/:courseId", adminAuth, getEnrolledStudentCount)
aggregationRouter.get("/average_grade/:studentId", getAverageGradePerCourse)

module.exports = aggregationRouter