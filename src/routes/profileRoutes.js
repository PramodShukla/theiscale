const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { getMyProfile,appGetMyProfile } = require("../controllers/profileController");

router.get("/", authMiddleware, userMiddleware, getMyProfile);

// Mobile Apis=============================================================================================================================

router.get("/get_user_details",authMiddleware, userMiddleware,appGetMyProfile);

module.exports = router;