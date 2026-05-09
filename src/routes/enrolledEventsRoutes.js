const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

const {
  enrollEvent,
  getMyEnrolledEvents,
} = require("../controllers/enrolledEventController");

// ENROLL EVENT
router.post(
  "/enroll-event",
  authMiddleware,
  enrollEvent
);

// MY ENROLLED EVENTS
router.get(
  "/my-enrolled-events",
  authMiddleware,
  getMyEnrolledEvents
);

module.exports = router;