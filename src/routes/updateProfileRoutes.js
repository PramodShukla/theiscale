const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { candidateUpload } = require("../middlewares/uploadMiddleware");
const updateProfileController = require("../controllers/updateProfileController");

//  Get profile (prefill form)
router.get(
  "/",
  authMiddleware,
  userMiddleware,
  updateProfileController.getProfile,
);

//  Update profile
router.put(
  "/",
  authMiddleware,
  userMiddleware,
  updateProfileController.updateProfile,
);

// update password
router.put(
  "/change-password",
  authMiddleware,
  userMiddleware,
  updateProfileController.changePassword,
);

// update profile image
router.put(
  "/update_profile_image",
  authMiddleware,
  userMiddleware,
  candidateUpload,
  updateProfileController.updateProfileImage,
);

// update profile image
router.get(
  "/get_profile_image",
  authMiddleware,
  userMiddleware,
  updateProfileController.getProfileImage,
);

// Mobile Apis=============================================================================================================================

router.put(
  "/update_user",
  authMiddleware,
  userMiddleware,
  updateProfileController.appUpdateUserProfileApp,
);

module.exports = router;
