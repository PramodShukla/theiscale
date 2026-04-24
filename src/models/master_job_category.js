const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  // m_category_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  m_category_type: {
    type: Number,
    required: true
  },

  m_education_type: {
    type: Number,
    required: true,
    enum:[0,1,2] // 0=none, 1=graduation, 2=diploma
  },

  m_category_name: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_category_image: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_category_desc: {
    type: String,
    required: true
  },

  m_category_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("master_job_category", categorySchema);