const express = require("express");
const router = express.Router();

const {
  addSuccessStory,
  updateSuccessStory,
  getAllSuccessStories,
  deleteSuccessStory,
} = require("../controllers/successStoryController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");



router.post("/add-ss", authMiddleware, adminMiddleware, addSuccessStory);
router.put("/update-ss/:id",authMiddleware, adminMiddleware, updateSuccessStory);
router.get("/all-ss",authMiddleware,adminMiddleware, getAllSuccessStories);
router.delete("/delete-ss/:id", authMiddleware, adminMiddleware, deleteSuccessStory);


router.get("/public-all-ss", getAllSuccessStories);





module.exports = router;