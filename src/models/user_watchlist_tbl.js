const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  m_watchlist_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  m_student_id: {
    type: Number,
    default: null
  },

  m_course_id: {
    type: Number,
    default: null
  },

  m_subject_id: {
    type: Number,
    default: null
  },

  m_topic_id: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model("user_watchlist_tbl", watchlistSchema);