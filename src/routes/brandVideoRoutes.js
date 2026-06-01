const express = require("express");
const router = express.Router();

const {
  addBrandVideo,
  updateBrandVideo,
  getAllBrandVideos,
  getSingleBrandVideo,
  deleteBrandVideo,
} = require("../controllers/brandVideoController");

const { brandVideoUpload } = require("../middlewares/uploadMiddleware");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  brandVideoUpload,
  addBrandVideo,
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  brandVideoUpload,
  updateBrandVideo,
);

router.get("/all", authMiddleware, adminMiddleware, getAllBrandVideos);

router.get("/:id", authMiddleware, adminMiddleware, getSingleBrandVideo);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBrandVideo);

module.exports = router;
