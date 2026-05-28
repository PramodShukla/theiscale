const express = require("express");
const router = express.Router();

const {
  addSuccessStory,
  updateSuccessStory,
  getAllSuccessStories,
  deleteSuccessStory,
  changeSuccessStoryStatus,
  getSingleSuccessStory,
} = require("../controllers/successStoryController");
const { successStoryUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post(
  "/add-ss",
  authMiddleware,
  adminMiddleware,
  successStoryUpload,
  addSuccessStory,
);
router.put(
  "/update-ss/:id",
  authMiddleware,
  adminMiddleware,
  successStoryUpload,
  updateSuccessStory,
);
router.get("/all-ss", authMiddleware, adminMiddleware, getAllSuccessStories);
router.delete(
  "/delete-ss/:id",
  authMiddleware,
  adminMiddleware,
  deleteSuccessStory,
);

router.get("/:id", authMiddleware, adminMiddleware, getSingleSuccessStory);

router.get("/public-all-ss", getAllSuccessStories);

router.patch(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  changeSuccessStoryStatus,
);

module.exports = router;
