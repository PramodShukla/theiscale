const mongoose = require('mongoose');

const mNotesSchema = new mongoose.Schema({
  // m_notes_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  m_notes_category: { type: Number, required: true },
  m_notes_subcategory: { type: Number, required: true },
  m_notes_title: { type: String, required: true },
  m_notes_intro: { type: String, required: true },
  m_notes_desc: { type: String, required: true },
  m_notes_banner: { type: String, required: true },
  m_notes_type: { type: Number, required: true }, // 1-free 2-paid
  m_notes_price: { type: Number, required: true },
  m_notes_offer_price: { type: Number, required: true },
  m_notes_file: { type: String, required: true },
  m_notes_rating: { type: Number, required: true },
  m_notes_total_enrolled: { type: Number, default: null },
  m_notes_modified: {
    type: Date,
    default: Date.now
  },
  m_notes_status: { type: Number, required: true },
  m_notes_share: { type: Number, default: 0 }
});

module.exports = mongoose.model('master_notes_tbl', mNotesSchema);