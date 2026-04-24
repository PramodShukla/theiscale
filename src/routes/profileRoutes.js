const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { getMyProfile } = require("../controllers/profileController");

router.get("/", authMiddleware, getMyProfile);

module.exports = router;