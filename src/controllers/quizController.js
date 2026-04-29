const Quiz = require("../models/master_quizs_tbl");
const fs = require("fs");

// ===============================
// ADD QUIZ
// ===============================
const addQuiz = async (req, res) => {
  try {
    const {
      m_quiz_course_id,
      m_quiz_package,
      m_quiz_title,
      m_quiz_keywords,
      m_quiz_startdate,
      m_quiz_enddate,
      m_quiz_startTime,
      m_quiz_endTime,
      m_quiz_duration,
      m_quiz_per_marks,
      m_quiz_pernegative_marks,
      m_quiz_shortDesc,
      m_quiz_description,
      m_quiz_remark,
      m_quiz_status,
      m_quiz_city,
      m_quiz_lang
    } = req.body;

    if (!m_quiz_title) {
      return res.status(400).json({
        status: false,
        message: "Quiz title is required"
      });
    }

    // FILES
    const icon = req.files?.m_quiz_icon
      ? req.files.m_quiz_icon[0].path
      : null;

    const banner = req.files?.m_quiz_banner
      ? req.files.m_quiz_banner[0].path
      : null;

    // AUTO ID
    const lastQuiz = await Quiz.findOne().sort({ m_quiz_id: -1 });
    const newId = lastQuiz ? lastQuiz.m_quiz_id + 1 : 1;

    const quiz = new Quiz({
      m_quiz_id: newId,

      m_quiz_course_id,
      m_quiz_package,

      m_quiz_title,
      m_quiz_keywords,

      m_quiz_icon: icon,
      m_quiz_banner: banner,

      m_quiz_shortDesc,
      m_quiz_description,
      m_quiz_remark,

      m_quiz_per_marks,
      m_quiz_pernegative_marks,

      m_quiz_duration,

      m_quiz_startdate,
      m_quiz_startTime,
      m_quiz_enddate,
      m_quiz_endTime,

      m_quiz_status: m_quiz_status ? Number(m_quiz_status) : 1,

      m_quiz_city,
      m_quiz_lang
    });

    const saved = await quiz.save();

    res.status(201).json({
      status: true,
      message: "Quiz added successfully",
      data: saved
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        status: false,
        message: "Quiz not found"
      });
    }

    const fields = req.body;

    // dynamic update
    Object.keys(fields).forEach((key) => {
      quiz[key] = fields[key];
    });

    // FILE UPDATE
    if (req.files?.m_quiz_icon) {
      if (quiz.m_quiz_icon && fs.existsSync(quiz.m_quiz_icon)) {
        fs.unlinkSync(quiz.m_quiz_icon);
      }
      quiz.m_quiz_icon = req.files.m_quiz_icon[0].path;
    }

    if (req.files?.m_quiz_banner) {
      if (quiz.m_quiz_banner && fs.existsSync(quiz.m_quiz_banner)) {
        fs.unlinkSync(quiz.m_quiz_banner);
      }
      quiz.m_quiz_banner = req.files.m_quiz_banner[0].path;
    }

    const updated = await quiz.save();

    res.json({
      status: true,
      message: "Quiz updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getAllQuiz = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const total = await Quiz.countDocuments();

    const data = await Quiz.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });

    res.json({
      status: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getQuizByPackage = async (req, res) => {
  try {
    const { package_id } = req.params;
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const total = await Quiz.countDocuments({
      m_quiz_package: package_id
    });

    const data = await Quiz.find({
      m_quiz_package: package_id
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });

    res.json({
      status: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        status: false,
        message: "Quiz not found"
      });
    }

    // delete files
    if (quiz.m_quiz_icon && fs.existsSync(quiz.m_quiz_icon)) {
      fs.unlinkSync(quiz.m_quiz_icon);
    }

    if (quiz.m_quiz_banner && fs.existsSync(quiz.m_quiz_banner)) {
      fs.unlinkSync(quiz.m_quiz_banner);
    }

    await Quiz.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "Quiz deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  addQuiz,
  updateQuiz,
  getAllQuiz,
  getQuizByPackage,
  deleteQuiz
};