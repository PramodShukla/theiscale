const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  updateMyProfileImage,
} = require("../controllers/myProfileController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { adminUpload } = require("../middlewares/uploadMiddleware");

router.get("/my", authMiddleware, adminMiddleware, getMyProfile);

router.put("/update", authMiddleware, adminMiddleware, updateMyProfile);

router.put("/password", authMiddleware, adminMiddleware, changeMyPassword);

router.put(
  "/update/image",
  authMiddleware,
  adminMiddleware,
  adminUpload,
  updateMyProfileImage,
);

module.exports = router;
  