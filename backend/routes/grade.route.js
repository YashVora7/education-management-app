const express = require('express');
const { assignGrade, getGrades } = require('../controllers/grade.controller');
const { auth, teacherAuth } = require('../middleware/auth.middleware');

const gradeRouter = express.Router();

gradeRouter.post('/assign', auth, teacherAuth, assignGrade);

gradeRouter.get('/my_grades', auth, getGrades);

module.exports = gradeRouter;
