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
  type: String,
  enum: ["active", "inactive"],
  default: "active"
},

  m_allied_added_on: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("allied", alliedSchema);