const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, required: true },
    submittedFileUrl: { type: String },
    submissionDate: { type: Date, default: Date.now() },
    status: { type: String, default: "Pending" }
  });

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  fileUrl: { type: String }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctOption: { type: Number, required: true }
    }
  ]
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true },
    assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    assignments: [assignmentSchema],
    quizzes: [quizSchema],
    submissions: [submissionSchema]
  },
  { timestamps: true }
);

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
