const mongoose = require("mongoose");

const SSSchema = new mongoose.Schema({
  m_ss_name: {
    type: String,
    required: true,
    trim: true
  },

  m_ss_placed: {
    type: String,
    required: true,
    trim: true,
    default: "N/A"
  },

  // 🔥 single package field (simple)
  m_ss_package: {
    type: String,
    default: "N/A"
  },

  // youtube link
  m_ss_video: {
    type: String,
    default: null
  },

  // feedback
  m_ss_feedback: {
    type: String,
    default: null
  },

  m_ss_status: {
    type: String,
    default: "active"
  },

  m_ss_added_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("success_story", SSSchema);