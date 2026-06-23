const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  // m_faq_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  m_faq_course: {
    type: Number,
    required: true
  },

  m_faq_title: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_faq_desc: {
    type: String,
    required: true
  },

  m_faq_status: {
    type: Number,
    enum:[0,1],
    default:1,
    required: true
  },

  m_faq_created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("faq", faqSchema);