const mongoose = require('mongoose');

const mLocationSchema = new mongoose.Schema({
  // m_location_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  m_location_country: { type: Number, required: true },
  m_location_state: { type: Number, required: true },
  m_location_city: { type: String, required: true },
  m_location_status: { type: Number, required: true } // 0-active 1-In-active
});

module.exports = mongoose.model('locations', mLocationSchema);