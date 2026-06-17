const mongoose = require("mongoose");

const SSSchema = new mongoose.Schema({
  m_ss_name: {
    type: String,
    required: true,
    trim: true,
  },

  m_ss_designation: {
    type: String,
    default: null,
    trim: true,
  },

  m_ss_image: {
    type: String,
    default: null,
  },

  m_ss_linkedin: {
    type: String,
    default: null,
  },

  m_ss_youtube_url: {
    type: String,
    default: null,
  },

  m_ss_placed: {
    type: String,
    default: "N/A",
    trim: true,
  },

  m_ss_package: {
    type: String,
    default: "N/A",
  },

  m_ss_feedback: {
    type: String,
    default: null,
  },

  m_ss_order: {
    type: Number,
    default: 0,
  },

  m_ss_status: {
    type: Number,
    enum: [0,1],
    default: 1,
  },

  m_ss_added_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("success_story", SSSchema);