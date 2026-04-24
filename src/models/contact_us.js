const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // m_contact_id: {
  //   type: Number,
  //   required: true
  // },
  m_contact_date: {
    type: Date,
    required: true
  },
  m_contact_usertype: {
    type: String,
    required: true
  },
  m_contact_name: {
    type: String,
    required: true
  },
  m_contact_email: {
    type: String,
    required: true
  },
  m_contact_phone: {
    type: Number,
    required: true
  },
  m_contact_whatsapp: {
    type: Number,
    required: true
  },
  m_contact_subject: {
    type: String,
    required: true
  },
  m_contact_message: {
    type: String,
    required: true
  },
  m_contact_schedule: {
    type: String,
    required: true
  },
  m_contact_ticket: {
    type: String,
    required: true
  },
  m_contact_time: {
    type: String, // MySQL TIME mapped as String
    required: true
  },
  m_contact_remark: {
    type: String,
    required: true
  },
  m_contact_status: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('contact_us', contactSchema);