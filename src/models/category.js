const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  // m_category_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_category_for: {
    type: Number,
    // required: true,
    enum:[1,2,3] // 1=course, 2=testseries, 3=notes
  },

  m_category_name: {
    type: String,
    required: true,
    trim: true,
  },

  m_category_slug: {
    type: String,
    // required: true,
    maxlength: 200,
    trim: true,
  },

  m_category_desc: {
    type: String,
    required: true,
    trim: true,
  },

  m_category_icon: {
    type: String,
    // required: true
  },

  m_category_banner: {
    type: String,
    // required: true
  },

  m_category_status: {
    type: Number,
    // required: true,
    enum:[0,1] // 0=active, 1=inactive
  },

  m_category_order: {
    type: Number,
    // required: true
  },

  m_category_keywords: {
    type: String,
    default: null
  },

  last_modified: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("category", categorySchema);