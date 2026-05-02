const mongoose = require("mongoose");

const alliedSchema = new mongoose.Schema({
  m_allied_title: {
    type: String,
    required: true,
    maxlength: 250,
    trim: true
  },

  m_allied_inr: {
    type: String,
    default: null
  },

  m_allied_image: {
    type: String,
    default: null
  },

  m_allied_order: {
    type: Number,
    default: 0
  },

  m_allied_status: {
    type: Number,
    enum: [0, 1], // 0 inactive, 1 active
    default: 1
  },

  m_allied_added_on: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("allied", alliedSchema);