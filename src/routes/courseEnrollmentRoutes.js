const express = require("express");
const router = express.Router();

const { enrollCourse } = require("../controllers/courseEnrollmentController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");


// POST /api/enroll
router.post("/enroll",authMiddleware,userMiddleware, enrollCourse);

module.exports = router;