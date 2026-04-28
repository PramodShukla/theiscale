const express = require("express");
const router = express.Router();

const {
  addTopic,
  getTopicsBySubject,
  updateTopic,
  deleteTopic
} = require("../controllers/topicsController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { topicUpload } = require("../middlewares/uploadMiddleware");

// ADD
router.post(
  "/add-topic",
  authMiddleware,
  adminMiddleware,
  topicUpload,
  addTopic
);

// GET BY SUBJECT
router.get(
  "/get-topics/:subject_id",
  authMiddleware,
  adminMiddleware,
  getTopicsBySubject
);

// UPDATE
router.put(
  "/update-topic/:id",
  authMiddleware,
  adminMiddleware,
  topicUpload,
  updateTopic
);

// DELETE
router.delete(
  "/delete-topic/:id",
  authMiddleware,
  adminMiddleware,
  deleteTopic
);

module.exports = router;