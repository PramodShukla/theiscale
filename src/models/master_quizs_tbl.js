const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  m_quiz_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_quiz_course_id: { type: Number, required: true },
  m_quiz_city: { type: Number, required: true },
  m_quiz_lang: { type: Number, default: null },

  m_quiz_title: { type: String, required: true },
  m_quiz_category_id: { type: Number, default: 0 },
  m_quiz_package: { type: Number, default: 0 },

  m_quiz_icon: { type: String, required: true },
  m_quiz_banner: { type: String, required: true },

  m_quiz_shortDesc: { type: String, required: true },
  m_quiz_description: { type: String, required: true },
  m_quiz_keywords: { type: String, default: null },

  m_quiz_per_marks: { type: Number, required: true },
  m_quiz_pernegative_marks: { type: Number, required: true },

  m_quiz_duration: { type: String, required: true }, // SQL TIME → String

  m_quiz_startdate: { type: Date, required: true },
  m_quiz_startTime: { type: String, required: true },

  m_quiz_enddate: { type: Date, required: true },
  m_quiz_endTime: { type: String, required: true },

  m_quiz_remark: { type: String, required: true },
  m_quiz_status: { type: Number, required: true },

  m_quiz_type: { type: Number, default: 2 } // 1=paid, 2=free
});

module.exports = mongoose.model("master_quizs_tbl", QuizSchema);