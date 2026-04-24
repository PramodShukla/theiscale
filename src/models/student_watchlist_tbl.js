const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  m_watchlist_id: {
    type: Number,
    required: true,
    unique: true
  },
  m_watchlist_student: {
    type: Number,
    required: true
  },
  m_watchlist_course: {
    type: Number,
    required: true
  },
  m_watchlist_subject: {
    type: Number,
    required: true
  },
  m_watchlist_topic: {
    type: Number,
    required: true
  },
  m_watchlist_added_on: {
    type: Date,
    required: true
  },
  m_watchlist_performance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('student_watchlist_tbl', WatchlistSchema);