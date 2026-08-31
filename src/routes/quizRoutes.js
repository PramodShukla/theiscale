const express = require("express");
const router = express.Router();

const {
  addQuiz,
  updateQuiz,
  getAllQuiz,
  getQuizByPackage,
  deleteQuiz
} = require("../controllers/quizController");

const { quizUpload } = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");



router.post("/add-quiz",authMiddleware,adminMiddleware, quizUpload, addQuiz);
router.put("/update-quiz/:id", authMiddleware, adminMiddleware, quizUpload, updateQuiz);

router.get("/all-quiz",authMiddleware,adminMiddleware, getAllQuiz);
router.get("/quiz-by-package/:package_id",authMiddleware,adminMiddleware, getQuizByPackage);

router.delete("/delete-quiz/:id", authMiddleware, adminMiddleware, deleteQuiz);

module.exports = router;