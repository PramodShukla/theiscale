const mongoose = require("mongoose");

const alliedSchema = new mongoose.Schema({
  // m_allied_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_allied_title: {
    type: String,
    required: true,
    maxlength: 250
  },

  m_allied_inr: {
    type: String,
    required: true
  },

  m_allied_image: {
    type: String,
    required: true
  },

  m_allied_order: {
    type: Number,
    required: true
  },

  m_allied_status: {
    type: Number,
    required: true
  },

  m_allied_added_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("allied", alliedSchema);