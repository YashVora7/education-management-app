const {Router} = require("express")
const multer = require("multer");
const path = require("path");
const { courseAdd, courseGet, courseGetById, courseUpdate, courseDelete, adminGet, adminGetById, adminAdd, adminUpdate, adminDelete, addAssignment, addQuiz, enrollInCourse, submitAssignment } = require("../controllers/course.controller")
const {adminAuth, teacherAuth} = require("../middleware/auth.middleware")
const courseRouter = Router()

// courseRouter.post("/add", courseAdd)
// courseRouter.get("/get", courseGet)
// courseRouter.get("/get/:id", courseGetById)
// courseRouter.patch("/update/:id", courseUpdate)
// courseRouter.delete("/delete/:id", courseDelete)
courseRouter.get("/admin/get",adminAuth,adminGet)
courseRouter.get("/admin/get/:id",adminAuth,adminGetById)
courseRouter.post("/admin/add",adminAuth,adminAdd)
courseRouter.patch("/admin/update/:id",adminAuth,adminUpdate)
courseRouter.delete("/admin/delete/:id",adminAuth,adminDelete)

courseRouter.patch('/update-content/:id', teacherAuth, courseUpdate);

const teacherStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/teacher_assignment');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    },
  });
  
  const uploadTeacherAssignment = multer({
    storage: teacherStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('assignmentFile');
  
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|zip/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Invalid file type!');
    }
  }

courseRouter.post("/:courseId/assignment", teacherAuth, uploadTeacherAssignment, addAssignment);
courseRouter.post("/:courseId/quiz", teacherAuth, addQuiz);

courseRouter.get("/get", courseGet)
courseRouter.post("/:courseId/enroll", enrollInCourse);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/assignments_student");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("assignmentFile");
  
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|zip/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Files only!");
    }
  }
courseRouter.post("/:courseId/assignments/:assignmentId/submit", upload, submitAssignment);



module.exports = courseRouter