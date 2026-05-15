const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  m_event_title: {
    type: String,
    required: true,
    maxlength: 200,
  },

  m_event_slug: {
    type: String,
  },

  //  ObjectId (important)
  m_event_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event_category",
  },

  m_event_banner: {
    type: String,
  },

  m_event_date_start: Date,
  m_event_date_end: Date,

  m_event_time_start: String,
  m_event_time_end: String,

  m_event_skill_level: String,

  m_event_certificate: {
    type: String, // yes / no
    enum: ["yes", "no"],
  },

  m_event_lang: String,

  m_event_host: String,

  m_event_url: String, // youtube

  m_event_link: String, // meeting

  m_event_contact_no: Number,
  m_event_whatsapp_no: Number,

  m_event_desc: String,

  m_event_file: String, // pdf

  m_event_no_of_enroll: Number,

  m_event_order: Number,

  m_event_status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  m_event_added_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("event", eventSchema);