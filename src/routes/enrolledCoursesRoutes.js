const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const {
  getEnrolledPremiumCourses,
  getEnrolledFreeCourses,
  getEnrolledCourseFullDetails,
  getCourseAccessDetails,
  appGetMyCourses
} = require("../controllers/enrolledCoursesController");

router.get(
  "/free-courses",
  authMiddleware,
  userMiddleware,
  getEnrolledFreeCourses,
);

router.get(
  "/premium-courses",
  authMiddleware,
  userMiddleware,
  getEnrolledPremiumCourses,
);

router.get(
  "/course-full-details/:course_id",
  authMiddleware,
  userMiddleware,
  getEnrolledCourseFullDetails
);

// Mobile Apis=============================================================================================================================


router.get("/user/courses",authMiddleware,userMiddleware,appGetMyCourses);




module.exports = router;