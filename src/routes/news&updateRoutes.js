const express = require("express");
const router = express.Router();

const {
  addNews,
  updateNews,
  getAllNews,
  getSingleNews,
  deleteNews,
  changeNewsStatus
} = require("../controllers/news&updateController");

const { newsupdatesUpload } = require("../middlewares/uploadMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-news&updates", authMiddleware, adminMiddleware, newsupdatesUpload, addNews);

router.put("/update-news&updates/:id", authMiddleware, adminMiddleware, newsupdatesUpload, updateNews); 

router.get("/all-news&updates", authMiddleware, adminMiddleware, getAllNews);

router.get("/single-news&updates/:id", authMiddleware, adminMiddleware, getSingleNews); 

router.delete("/delete-news&updates/:id", authMiddleware, adminMiddleware, deleteNews);

router.patch("/status/:id", authMiddleware, adminMiddleware, changeNewsStatus);

router.get("/public-all-news&updates", getAllNews);

router.get("/public-single-news&updates/:id", getSingleNews); 




module.exports = router;