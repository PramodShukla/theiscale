const express = require("express");
const router = express.Router();

const {
  addTool,
  getToolsByCourse,
  updateTool,
  deleteTool,
  appGetCourseTools,
} = require("../controllers/toolsController");

const { toolUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

// ADD
router.post("/add-tool", authMiddleware, adminMiddleware, toolUpload, addTool);

// GET BY COURSE
router.get(
  "/get-tools/:courseId",
  authMiddleware,
  adminMiddleware,
  getToolsByCourse,
);

// UPDATE
router.put(
  "/update-tool/:id",
  authMiddleware,
  adminMiddleware,
  toolUpload,
  updateTool,
);

// DELETE
router.delete("/delete-tool/:id", authMiddleware, adminMiddleware, deleteTool);

router.get("/public-get-tools/:courseId", getToolsByCourse);

router.post("/tool_list", authMiddleware,userMiddleware, appGetCourseTools);

module.exports = router;
