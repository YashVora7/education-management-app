const express = require('express');
const { enrollStudent, removeStudent, getEnrollments } = require('../controllers/enrollment.controller');
const { auth, adminAuth } = require('../middleware/auth.middleware');

const enrollmentRouter = express.Router();

enrollmentRouter.post('/enroll', auth, adminAuth, enrollStudent);
enrollmentRouter.post('/remove', auth, adminAuth, removeStudent);

enrollmentRouter.get('/my_enrollments', auth, getEnrollments);

module.exports = enrollmentRouter;
