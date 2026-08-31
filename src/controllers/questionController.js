const Question = require("../models/questions"); // Make sure the path is correct
const mongoose = require("mongoose");

// ===============================
// ADD QUESTION
// ===============================
const addQuestion = async (req, res) => {
  try {
    const {
      m_ques_quiz, // The ID of the quiz this question belongs to
      m_ques_title_en, // The question text
      m_ques_op1_en,
      m_ques_op2_en,
      m_ques_op3_en,
      m_ques_op4_en,
      m_ques_ans,
      m_ques_solutions,
    } = req.body;

    // 1. VALIDATION
    // ✅ Only question title is mandatory as per your request
    if (!m_ques_title_en) {
      return res.status(400).json({
        status: false,
        message: "Question text (m_ques_title_en) is required",
      });
    }
    // A question must belong to a quiz
    if (!m_ques_quiz || !mongoose.Types.ObjectId.isValid(m_ques_quiz)) {
        return res.status(400).json({
          status: false,
          message: "A valid Quiz ID (m_ques_quiz) is required",
        });
    }
    // Validate answer if provided
    if (m_ques_ans && !["A", "B", "C", "D"].includes(m_ques_ans.toUpperCase())) {
        return res.status(400).json({
            status: false,
            message: "Answer (m_ques_ans) must be A, B, C, or D",
        });
    }

    // 2. AUTO-INCREMENT ID
    const lastQuestion = await Question.findOne().sort({ m_ques_id: -1 });
    const newId = lastQuestion ? lastQuestion.m_ques_id + 1 : 1;

    // 3. CREATE & SAVE
    const newQuestion = new Question({
      m_ques_id: newId,
      m_ques_quiz,
      m_ques_title_en,
      m_ques_op1_en: m_ques_op1_en || null,
      m_ques_op2_en: m_ques_op2_en || null,
      m_ques_op3_en: m_ques_op3_en || null,
      m_ques_op4_en: m_ques_op4_en || null,
      m_ques_ans: m_ques_ans ? m_ques_ans.toUpperCase() : null,
      m_ques_solutions: m_ques_solutions || null,
    });

    const saved = await newQuestion.save();
    res.status(201).json({ status: true, message: "Question added successfully", data: saved });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// GET QUESTIONS BY QUIZ ID
// ===============================
const getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
        return res.status(400).json({ status: false, message: "Invalid Quiz ID" });
    }

    // Find questions and select only the required fields
    const questions = await Question.find({ m_ques_quiz: quizId })
      .select('m_ques_title_en m_ques_op1_en m_ques_op2_en m_ques_op3_en m_ques_op4_en m_ques_ans');

    if (questions.length === 0) {
        return res.status(404).json({ status: true, message: "No questions found for this quiz", data: [] });
    }

    res.json({ status: true, data: questions });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// UPDATE QUESTION
// ===============================
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid Question ID" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ status: false, message: "Question not found" });
    }
    
    const { 
        m_ques_title_en,
        m_ques_op1_en,
        m_ques_op2_en,
        m_ques_op3_en,
        m_ques_op4_en,
        m_ques_ans,
        m_ques_solutions 
    } = req.body;

    // Update fields if they are provided in the request body
    if (m_ques_title_en) question.m_ques_title_en = m_ques_title_en;
    if (m_ques_op1_en !== undefined) question.m_ques_op1_en = m_ques_op1_en;
    if (m_ques_op2_en !== undefined) question.m_ques_op2_en = m_ques_op2_en;
    if (m_ques_op3_en !== undefined) question.m_ques_op3_en = m_ques_op3_en;
    if (m_ques_op4_en !== undefined) question.m_ques_op4_en = m_ques_op4_en;
    if (m_ques_solutions !== undefined) question.m_ques_solutions = m_ques_solutions;

    if (m_ques_ans) {
        if (!["A", "B", "C", "D"].includes(m_ques_ans.toUpperCase())) {
            return res.status(400).json({ status: false, message: "Answer must be A, B, C, or D" });
        }
        question.m_ques_ans = m_ques_ans.toUpperCase();
    }

    const updated = await question.save();
    res.json({ status: true, message: "Question updated successfully", data: updated });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// ===============================
// DELETE QUESTION
// ===============================
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid Question ID" });
    }
    
    const deleted = await Question.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: "Question not found" });
    }
    
    res.json({ status: true, message: "Question deleted successfully" });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addQuestion,
  getQuestionsByQuiz,
  updateQuestion,
  deleteQuestion,
};