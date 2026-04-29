const express = require("express");
const router = express.Router();
const { 
    addQuestion,
    getQuestionsByQuiz,
    updateQuestion,
    deleteQuestion
} = require("../controllers/questionController"); // Path aache se check kar lein

// IMPORTANT: Add `app.use(express.json());` in your main server file (e.g., app.js or server.js)

router.post("/add-question", addQuestion);
router.get("/questions-by-quiz/:quizId", getQuestionsByQuiz);
router.put("/update-question/:id", updateQuestion);
router.delete("/delete-question/:id", deleteQuestion);

module.exports = router;