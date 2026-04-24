const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const updateProfileController = require("../controllers/updateProfileController");

//  Get profile (prefill form)
router.get("/", authMiddleware, updateProfileController.getProfile);

//  Update profile
router.put("/", authMiddleware, updateProfileController.updateProfile);

// update password
router.put("/change-password", authMiddleware, updateProfileController.changePassword);

module.exports = router;