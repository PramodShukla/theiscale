const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
  // m_org_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  m_org_type: {
    type: String,
    required: true,
    maxlength: 20
  },

  m_org_name: {
    type: String,
    required: true,
    maxlength: 300
  },

  m_org_hr_email1: {
    type: String,
    required: true,
    maxlength: 100
  },

  m_org_hr_email2: {
    type: String,
    required: true,
    maxlength: 100
  },

  m_org_hr_contact: {
    type: Number,
    required: true,
    maxlength: 20
  },

  m_org_whatsapp: {
    type: Number,
    required: true,
    maxlength: 20
  },

  m_org_desc: {
    type: String,
    required: true
  },

  m_org_status: {
    type: String,
    required: true,
    maxlength: 10
  },

  m_org_added_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("master_hiring_form", orgSchema);