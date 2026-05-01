const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { getMyProfile } = require("../controllers/profileController");

router.get("/", authMiddleware, userMiddleware, getMyProfile);

module.exports = router;