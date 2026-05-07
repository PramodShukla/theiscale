const express = require("express");
const router = express.Router();

const {
  markLectureComplete,
  getLecturesWithProgress,
  getCourseProgress,
  getCourseProgressDebug,
} = require("../controllers/lectureProgressController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

router.post("/mark-complete", authMiddleware, userMiddleware, markLectureComplete);
router.get(
  "/lectures/:subject_id",
  authMiddleware,
  userMiddleware,
  getLecturesWithProgress,
);
router.get(
  "/debug/course/:course_id",
  authMiddleware,
  userMiddleware,
  getCourseProgressDebug,
);
router.get(
  "/course/:course_id",
  authMiddleware,
  userMiddleware,
  getCourseProgress,
);

module.exports = router;
