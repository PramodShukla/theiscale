const router = require("express").Router();
const express = require("express");

const {
  addNews,
  updateNews,
  deleteNews,
  getAllNews,
  getSingleNews
} = require("../controllers/newsController");

const { newsUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/add-news",authMiddleware,adminMiddleware, newsUpload, addNews);
router.put("/update-news/:id", authMiddleware, adminMiddleware, newsUpload, updateNews);
router.delete("/delete-news/:id", authMiddleware, adminMiddleware, deleteNews);
router.get("/all-news",authMiddleware,adminMiddleware, getAllNews);
router.get("/single-news/:id", authMiddleware, adminMiddleware, getSingleNews);


router.get("/public-all-news", getAllNews);

module.exports = router;