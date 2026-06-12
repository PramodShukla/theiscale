const express = require("express");
const router = express.Router();

const { playVideo } = require("../controllers/videoController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");
// const { checkCourseAccessMiddleware } = require("../middlewares/checkCourseAccessMiddleware");

router.post("/play_video", authMiddleware, userMiddleware, playVideo);

module.exports = router;


