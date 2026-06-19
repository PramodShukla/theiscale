const router = require("express").Router();
const express = require("express");

const {
  addNews,
  updateNews,
  deleteNews,
  getAllNews,
  getSingleNews,
  changeNewsStatus,

  appGetBlogsForApp,
  appGetSingleBlogForApp,
} = require("../controllers/newsController");

const { newsUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userMiddleware } = require("../middlewares/userMiddleware");

router.post("/add-news", authMiddleware, adminMiddleware, newsUpload, addNews);
router.put(
  "/update-news/:id",
  authMiddleware,
  adminMiddleware,
  newsUpload,
  updateNews,
);
router.delete("/delete-news/:id", authMiddleware, adminMiddleware, deleteNews);
router.get("/all-news", authMiddleware, adminMiddleware, getAllNews);
router.get("/single-news/:id", authMiddleware, adminMiddleware, getSingleNews);
router.patch("/:id", authMiddleware, adminMiddleware, changeNewsStatus);

router.get("/public-all-news", getAllNews);

// Mobile Apis=============================================================================================================================

router.get("/all_blogs", authMiddleware, userMiddleware, appGetBlogsForApp);

router.post("/blog_detail",authMiddleware,userMiddleware, appGetSingleBlogForApp);

module.exports = router;
