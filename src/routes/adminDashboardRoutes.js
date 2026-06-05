const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getMonthWiseRegistrations,
  getTopCourses,
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

module.exports = router;
