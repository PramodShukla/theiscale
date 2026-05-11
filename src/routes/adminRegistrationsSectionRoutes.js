const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  getCourseRegistrations,
} = require("../controllers/adminRegistrationsSectionController");


router.get(
  "/course-registrations",
  authMiddleware,
  adminMiddleware,
  getCourseRegistrations
);

module.exports = router;