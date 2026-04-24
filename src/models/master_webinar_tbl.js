const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  m_webinar_title: { type: String, required: true },
  m_webinar_topic: { type: String, required: true },
  m_webinar_desc: { type: String, required: true },

  m_webinar_date: { type: Date, required: true },
  m_webinar_time: { type: String, required: true },

  m_webinar_host_link: { type: String, required: true },
  m_webinar_link: { type: String, required: true },

  m_webinar_mode: {
    type: Number,
    required: true // 1-online, 2-offline
  },

  m_webinar_type: {
    type: Number,
    required: true // 1-free, 2-paid
  },

  price: { type: Number, default: 0 },
  offer_price: { type: Number, default: 0 },

  m_webinar_banner: { type: String, required: true },
  m_webinar_duration: { type: String, required: true },

  m_webinar_speaker_name: { type: String, required: true },
  m_webinar_speaker_experience: { type: String, required: true },
  m_webinar_speaker_degisnation: { type: String, required: true },

  m_webinar_speaker_image: { type: String, required: true },
  m_webinar_speaker_mobile: { type: Number, required: true },
  m_webinar_speaker_email: { type: String, required: true },

  m_webinar_status: { type: Number, required: true },

  m_webinar_host_url: { type: String, default: null },
  m_webinar_meeting_id: { type: String, default: null },
  m_webinar_password: { type: String, default: null },

  m_webinar_order: { type: Number, default: null },
  m_webinar_view: { type: Number, default: 0 },
  m_webinar_share: { type: Number, default: 0 }
});

module.exports = mongoose.model("master_webinar_tbl", webinarSchema);