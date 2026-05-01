const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  // m_banner_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_banner_modified: {
    type: Date,
    required: true,
    default: Date.now,
    set: Date.now()
  },

  m_banner_image: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_banner_size: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_banner_title: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_banner_description: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_banner_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("banners", bannerSchema);