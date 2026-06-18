const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  m_quiz_id: { type: String, }, // AUTO_INCREMENT handled separately
  m_quiz_course_id: { type: String,  },
  m_quiz_city: { type: String,  },
  m_quiz_lang: { type: String, default: null },

  m_quiz_title: { type: String, required: true },
  m_quiz_category_id: { type: String, default: 0 },
  m_quiz_package: { type: String, default: 0 },

  m_quiz_icon: { type: String,  },
  m_quiz_banner: { type: String,  },

  m_quiz_shortDesc: { type: String,  },
  m_quiz_description: { type: String,  },
  m_quiz_keywords: { type: String, default: null },

  m_quiz_per_marks: { type: Number,  },
  m_quiz_pernegative_marks: { type: Number,  },

  m_quiz_duration: { type: String,  }, // SQL TIME → String

  m_quiz_startdate: { type: Date,  },
  m_quiz_startTime: { type: String,  },

  m_quiz_enddate: { type: Date,  },
  m_quiz_endTime: { type: String,  },

  m_quiz_remark: { type: String,  },
  m_quiz_status: { type: Number, enum:[0,1], default:1 },

  m_quiz_type: { type: Number, default: 2 } // 1=paid, 2=free
});

module.exports = mongoose.model("quizs", QuizSchema);    