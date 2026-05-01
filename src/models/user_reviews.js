const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  m_name: {
    type: String,
    default: null,
    maxlength: 256
  },

  m_designation: {
    type: String,
    default: null,
    maxlength: 256
  },

  m_image: {
    type: String,
    default: null,
    maxlength: 256
  },

  m_review: {
    type: String,
    default: null
  },

  m_status: {
    type: String,
    required: true,
    maxlength: 10
  },

  m_added_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("user_reviews", testimonialSchema);