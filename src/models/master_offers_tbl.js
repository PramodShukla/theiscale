const mongoose = require('mongoose');

const mOfferSchema = new mongoose.Schema({
  // m_offer_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  m_offer_title: { type: String, required: true },
  m_offer_image: { type: String, required: true },
  m_offer_des: { type: String, required: true },
  m_offer_url: { type: String, required: true },
  m_offer_priority: { type: Number, required: true },
  m_offer_started: { type: Date, required: true },
  m_offer_status: { type: Number, required: true }
});

module.exports = mongoose.model('master_offers_tbl', mOfferSchema);