const mongoose = require('mongoose');

const mLgSchema = new mongoose.Schema({
  // m_lg_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  m_lg_title: { type: String, required: true },
  m_lg_slug: { type: String, required: true },
  m_lg_desc: { type: String, required: true },
  m_lg_college: { type: Number, required: true },
  m_lg_education: { type: Number, required: true },
  m_lg_fod: { type: Number, default: 0, required: false },
  m_lg_branch: { type: Number, default: 0, required: true },
  m_lg_pass: { type: Number, default: 0, required: true },
  m_lg_state: { type: Number, default: 0, required: true },
  m_lg_gender: { type: Number, required: true },
  m_lg_ldesktop: { type: Number, default: 0, required: true },
  m_lg_warking: { type: Number, default: 0, required: true },
  m_lg_redirect_link: { type: String, required: true },
  m_lg_status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('master_lead_generate_tbl', mLgSchema);