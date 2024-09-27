const courseModel = require("../models/course.model");

const courseAdd = async (req, res) => {
  try {
    let { title, description, date, assignedTeacher, enrolledStudent } =
      req.body;

    let course = new courseModel({
      title,
      description,
      date,
      assignedTeacher,
      enrolledStudent,
      user: req.user.userId,
    });

    await course.save();
    res.status(201).json({ message: "course Added Successfully", course });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const courseGet = async (req, res) => {
  try {
    const courses = await courseModel.find({ user: req.user.userId });

    if (!courses.length) {
      return res.status(404).json({ message: "courses Not Found" });
    }

    res.status(200).json({ message: "Your courses", courses });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const courseGetById = async (req, res) => {
  try {
    let { id } = req.params;

    let course = await courseModel.findOne({ _id: id, user: req.user.userId });
    if (!course) {
      return res.status(404).json({ error: "course Not Found" });
    }

    res.status(201).json({ message: "Your Requested course", course });
  } catch (error) {
    req.status(500).json({ error, details: error.message });
  }
};

const courseUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, date, assignedTeacher, enrolledStudent } =
      req.body;

    let updatedcourse = await courseModel.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, description, date, assignedTeacher, enrolledStudent },
      { new: true }
    );

    if (!updatedcourse) {
      return res.status(404).json({ message: "course Not Found" });
    }
    res.status(201).json({ message: "course Updated", updatedcourse });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const courseDelete = async (req, res) => {
  try {
    let { id } = req.params;

    let deletedcourse = await courseModel.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (!deletedcourse) {
      return res.status(404).json({ message: "course Not Found" });
    }
    res.status(201).json({ message: "course Deleted", deletedcourse });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const adminGet = async (req, res) => {
  try {
    const courses = await courseModel.find();

    if (!courses.length) {
      return res.status(404).json({ message: "courses Not Found" });
    }

    res.status(200).json({ message: "Your courses", courses });
  } catch (error) {
    res.status(500).json({ error, details: message });
  }
};

const adminGetById = async (req, res) => {
  try {
    let { id } = req.params;

    let course = await courseModel.findOne({ _id: id });
    if (!course) {
      return res.status(404).json({ error: "course Not Found" });
    }

    res.status(201).json({ message: "Your Requested course", course });
  } catch (error) {
    req.status(500).json({ error, details: error.message });
  }
};

const adminAdd = async (req, res) => {
  try {
    let { title, description, date, assignedTeacher, enrolledStudent } =
      req.body;

    let course = new courseModel({
      title,
      description,
      date,
      assignedTeacher,
      enrolledStudent,
      user: req.user.userId,
    });

    await course.save();
    res.status(201).json({ message: "course Added Successfully", course });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const adminUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, date, assignedTeacher, enrolledStudent } =
      req.body;

    let updatedcourse = await courseModel.findOneAndUpdate(
      { _id: id },
      { title, description, date, assignedTeacher, enrolledStudent },
      { new: true }
    );

    if (!updatedcourse) {
      return res.status(404).json({ message: "course Not Found" });
    }
    res.status(201).json({ message: "course Updated", updatedcourse });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const adminDelete = async (req, res) => {
  try {
    let { id } = req.params;

    let deletedcourse = await courseModel.findOneAndDelete({_id: id});
    if (!deletedcourse) {
      return res.status(404).json({ message: "course Not Found" });
    }
    res.status(201).json({ message: "course Deleted", deletedcourse });
  } catch (error) {
    res.status(500).json({ error, details: error.message });
  }
};

const addAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, dueDate } = req.body;

    const course = await courseModel.findOne({ _id: courseId, assignedTeacher: req.user.userId });
    
    if (!course) {
      return res.status(404).json({ message: "Course not found or does not belong to you" });
    }

    let fileUrl = null;
    if (req.file) {
      fileUrl = req.file.path;
    }

    const newAssignment = {
      title,
      description,
      dueDate,
      fileUrl,
    };

    course.assignments.push(newAssignment);
    await course.save();

    res.status(201).json({ message: "Assignment added successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, questions } = req.body;

    const course = await courseModel.findOne({ _id: courseId, assignedTeacher: req.user.userId });
    
    if (!course) {
      return res.status(404).json({ message: "Course not found or access denied" });
    }

    const newQuiz = { title, questions };
    course.quizzes.push(newQuiz);
    await course.save();

    res.status(201).json({ message: "Quiz added", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(req.user.userId)) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    course.enrolledStudents.push(req.user.userId);
    await course.save();

    res.status(200).json({ message: "Successfully enrolled in the course", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.enrolledStudents.includes(req.user.userId)) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    const assignment = course.assignments.id(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const newSubmission = {
      student: req.user.userId,
      assignment: assignmentId,
      submittedFileUrl: `/uploads/assignments/${req.file.filename}`,
    };

    course.submissions.push(newSubmission);
    await course.save();

    res.status(201).json({ message: "Assignment submitted successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  courseAdd,
  courseGet,
  courseGetById,
  courseDelete,
  courseUpdate,
  adminGet,
  adminAdd,
  adminGet,
  adminGetById,
  adminUpdate,
  adminDelete,
  addAssignment,
  addQuiz,
  enrollInCourse,
  submitAssignment
};
