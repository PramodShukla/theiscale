const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getMonthWiseRegistrations,
  getTopCourses,
  getRecentActivities
} = require("../controllers/adminDashboardController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get("/cards", authMiddleware, adminMiddleware, getDashboardStats);

router.get(
  "/graph",
  authMiddleware,
  adminMiddleware,
  getMonthWiseRegistrations,
);

router.get(
  "/top-courses",
  authMiddleware,
  adminMiddleware,
  getTopCourses,
);

router.get("/recent_activities",authMiddleware, adminMiddleware, getRecentActivities);

module.exports = router;
