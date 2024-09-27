const courseModel = require('../models/course.model');
const userModel = require('../models/user.model');

const enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = await userModel.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(400).json({ message: "Invalid student" });
    }

    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
    }

    await course.save();
    res.status(200).json({ message: "Student enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const removeStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.enrolledStudents = course.enrolledStudents.filter(id => id !== studentId);

    await course.save();
    res.status(200).json({ message: "Student removed successfully", course });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const getEnrollments = async (req, res) => {
  try {

    // const student = await courseModel.findOne({enrollStudent:req.user.userId}); 
    // if(student.role != "student"){
    //   return res.status(400).json({ message: "Invalid student" });
    // }

    const courses = await courseModel.find({ enrolledStudents: req.user.userId });
    res.status(200).json({ message: "Enrolled courses", courses });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

module.exports = { enrollStudent, removeStudent, getEnrollments };
