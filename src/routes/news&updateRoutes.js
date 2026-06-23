console.log("News&updates Routes Loaded");
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

router.get("/test", (req, res) => {
  res.json({
    status: true,
    message: "working",
  });
});





router.post("/add", authMiddleware, adminMiddleware, newsupdatesUpload, addNews);

router.put("/update/:id", authMiddleware, adminMiddleware, newsupdatesUpload, updateNews); 

router.get("/all", authMiddleware, adminMiddleware, getAllNews);

router.get("/:id", authMiddleware, adminMiddleware, getSingleNews); 

router.delete("/:id", authMiddleware, adminMiddleware, deleteNews);

router.patch("/status/:id", authMiddleware, adminMiddleware, changeNewsStatus);

router.get("/public/all_news_updates", getAllNews);

router.get("/public-single-news_updates/:id", getSingleNews); 




module.exports = router;