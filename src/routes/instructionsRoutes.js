const express = require("express");
const router = express.Router();

const { addInstruction,
  getAllInstructions,
  getInstructionsByQuizId,
  updateInstruction,
  deleteInstruction, } = require("../controllers/instructionsController"); 
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/add-instruction", authMiddleware, adminMiddleware, addInstruction);
router.get("/all-instructions", authMiddleware, adminMiddleware, getAllInstructions);
router.get("/instructions-by-quiz/:quizId", authMiddleware, adminMiddleware, getInstructionsByQuizId);
router.put("/update-instruction/:id", authMiddleware, adminMiddleware, updateInstruction);
router.delete("/delete-instruction/:id", authMiddleware, adminMiddleware, deleteInstruction);

module.exports = router;