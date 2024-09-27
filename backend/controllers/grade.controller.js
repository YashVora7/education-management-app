const gradeModel = require('../models/grade.model');
const courseModel = require('../models/course.model');

const assignGrade = async (req, res) => {
  try {
    const { courseId, studentId, grade } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const newGrade = new gradeModel({
      course: courseId,
      student: studentId,
      grade
    });

    await newGrade.save();
    res.status(201).json({ message: "Grade assigned successfully", newGrade });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const getGrades = async (req, res) => {
  try {
    const grades = await gradeModel.find({ student: req.user.userId }).populate('course');
    res.status(200).json({ message: "Your grades", grades });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

module.exports = { assignGrade, getGrades };
