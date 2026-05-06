const express = require("express");
const router = express.Router();

const {
  addTopic,
  getTopicsBySubject,
  updateTopic,
  deleteTopic,
  getPublicTopics,
  getPrivateTopics,
} = require("../controllers/topicsController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { checkCourseAccessMiddleware } = require("../middlewares/checkCourseAccessMiddleware");
const { topicUpload } = require("../middlewares/uploadMiddleware");

// ADD
router.post(
  "/add-topic",
  authMiddleware,
  adminMiddleware,
  topicUpload,
  addTopic,
);

// GET BY SUBJECT
router.get(
  "/get-topics/:subject_id",
  authMiddleware,
  adminMiddleware,
  getTopicsBySubject,
);

// UPDATE
router.put(
  "/update-topic/:id",
  authMiddleware,
  adminMiddleware,
  topicUpload,
  updateTopic,
);

// DELETE
router.delete(
  "/delete-topic/:id",
  authMiddleware,
  adminMiddleware,
  deleteTopic,
);

// PUBLIC (No auth)
router.get("/public/:subject_id", getPublicTopics);

// PRIVATE (Protected)
router.get(
  "/private/:subject_id",
  authMiddleware,
  userMiddleware,
  checkCourseAccessMiddleware,
  getPrivateTopics,
);

module.exports = router;
