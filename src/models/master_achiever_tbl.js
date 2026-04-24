const mongoose = require("mongoose");

const achieverSchema = new mongoose.Schema({
  // m_achiever_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_achiever_name: {
    type: String,
    required: true,
    maxlength: 250
  },

  m_achiever_qualification: {
    type: String,
    required: true
  },

  m_achiever_title: {
    type: String,
    required: true
  },

  m_achiever_package: {
    type: String,
    required: true
  },

  m_achiever_image: {
    type: String,
    required: true
  },

  m_achiever_status: {
    type: Number,
    required: true
  },

  m_achiever_order: {
    type: Number,
    required: true
  },

  m_achiever_added_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("master_achiever_tbl", achieverSchema);