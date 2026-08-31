const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  // m_admin_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_admin_type: {
    type: Number,
    required: true
  },

  m_admin_role: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_admin_name: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_admin_email: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_admin_password: {
    type: String,
    default: null,
    maxlength: 255
  },

  m_admin_contact: {
    type: Number,
    default: null,
    maxlength: 10
  },

  m_admin_img: {
    type: String,
    default: null
  },

  m_admin_status: {
    type: Number,
    default: null,
    enum: [1, 2] // 1=activated , 2=deactivated
  },

  m_created_on: {
    type: Date,
    required: true,
    default: Date.now
  },

  remember_token: {
    type: String,
    default: null,
    maxlength: 100
  },

  notify_date: {
    type: String,
    default: null,
    maxlength: 255
  }
});

module.exports = mongoose.model("admin", adminSchema);