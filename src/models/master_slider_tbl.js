const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  m_slider_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_slider_title: { type: String, required: true },
  m_slider_image: { type: String, required: true },
  m_slider_status: { type: Number, required: true },
  m_slider_added_on: { type: Date, required: true }
});

module.exports = mongoose.model("master_slider_tbl", SliderSchema);