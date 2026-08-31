const mongoose = require("mongoose");

const SNewsSchema = new mongoose.Schema({
  m_snews_title: { type: String, trim: true },
  m_snews_image: { type: String },
  m_snews_des: { type: String },
  m_snews_url: { type: String },
  m_snews_status: { type: Number, default: 1, enum: [0, 1] },
  m_snews_added_on: { type: Date },
  m_snews_updated_on: { type: Date },
});

module.exports = mongoose.model("news", SNewsSchema);
