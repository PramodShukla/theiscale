const mongoose = require("mongoose");

const testPackageSchema = new mongoose.Schema({
  m_package_course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true
  },

  m_package_title: {
    type: String,
    required: true
  },

  m_package_language: {
    type: String,
    required: true
  },

  m_package_image: {
    type: String,
    default: null
  },

  m_package_order: {
    type: Number,
    default: 0
  },

  m_package_intro: {
    type: String,
    default: null
  },

  m_package_description: {
    type: String,
    default: null
  },

  m_package_status: {
    type: Number,
    default: 1
  },

  m_package_created: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("test_package", testPackageSchema);