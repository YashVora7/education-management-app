const mongoose = require("mongoose");
const courseModel = require("../models/course.model");
const gradeModel = require("../models/grade.model");

const getEnrolledStudentCount = async (req, res) => {
  try {
    const { courseId } = req.params;

    const result = await courseModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
      { $project: { enrolledStudentCount: { $size: "$enrolledStudents" } } },
    ]);

    res.status(200).json({ enrolledStudents: result[0].enrolledStudentCount });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const getAverageGradePerCourse = async (req, res) => {
  const { studentId } = req.params;

  try {
    const averageGrades = await gradeModel.aggregate([
      {
        $match: {  student:new mongoose.Types.ObjectId(studentId) },
      },
      {
        $group: {
          _id: "$course",
          averageGrade: { $avg: "$grade" },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails",
      },
      {
        $project: {
          _id: 0,
          courseId: "$_id",
          courseName: "$courseDetails.name",
          averageGrade: 1,
        },
      },
    ]);

    res.status(200).json(averageGrades);
  } catch (error) {
    res.status(500).json({ error, details:error.message });
  }
};

module.exports = { getEnrolledStudentCount, getAverageGradePerCourse };
