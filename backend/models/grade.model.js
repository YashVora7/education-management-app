const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    grade: { type: Number, required: true }
  },
  { timestamps: true }
);

const gradeModel = mongoose.model('grade', gradeSchema);

module.exports = gradeModel;
