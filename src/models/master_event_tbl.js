const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // m_event_id: {
    //   type: Number,
    //   default: null,
    // },

    m_event_title: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_event_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_event_category: {
      type: String,
      required: true,
      maxlength: 20,
    },

    m_event_cat_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_event_for: {
      type: String,
      required: true,
      maxlength: 20,
    },

    m_event_banner: {
      type: String,
      required: true,
      maxlength: 100,
    },

    m_event_date_start: {
      type: Date,
      required: true,
    },

    m_event_date_end: {
      type: Date,
      required: true,
    },

    m_event_time_start: {
      type: String,
      required: true,
    },

    m_event_time_end: {
      type: String,
      required: true,
    },

    m_event_skill_level: {
      type: String,
      required: true,
      maxlength: 100,
    },

    m_event_certificate: {
      type: String,
      required: true,
      maxlength: 100,
    },

    m_event_lang: {
      type: String,
      required: true,
      maxlength: 100,
    },

    m_event_host: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_event_url: {
      type: String,
      required: true,
      maxlength: 300,
    },

    m_event_link: {
      type: String,
      required: true,
      maxlength: 300,
    },

    m_event_contact_no: {
      type: Number,
      required: true,
      maxlength: 20,
    },

    m_event_whatsapp_no: {
      type: Number,
      required: true,
      maxlength: 20,
    },

    m_event_desc: {
      type: String,
      required: true,
    },

    m_event_file: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_event_no_of_enroll: {
      type: String, // Number kar sakte hai
      required: true,
      maxlength: 200,
    },

    m_event_order: {
      type: String,
      required: true,
      maxlength: 20,
    },

    m_event_status: {
      type: String,
      required: true,
      maxlength: 20,
    },

    m_event_added_on: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("master_event_tbl", eventSchema);