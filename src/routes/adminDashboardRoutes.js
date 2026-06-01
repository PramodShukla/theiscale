const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getMonthWiseRegistrations,
} = require("../controllers/adminDashboardController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get("/cards",authMiddleware,adminMiddleware, getDashboardStats);

router.get("/graph",authMiddleware,adminMiddleware, getMonthWiseRegistrations);

module.exports = router;
