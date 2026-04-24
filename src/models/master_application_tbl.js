const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  // m_app_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_app_title: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_app_desc: {
    type: String,
    default: null
  },

  m_app_logo: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_app_favicon: {
    type: String,
    default: null
  },

  m_aap_email: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_app_pass: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_app_address: {
    type: String,
    default: null
  },

  m_aap_contact: {
    type: Number,
    default: null,
    maxlength: 255
  },

  m_app_status: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model("master_application_tbl", appSchema);