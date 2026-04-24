const mongoose = require("mongoose");

const SNewsSchema = new mongoose.Schema({
  m_snews_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_snews_image: { type: String, required: true },
  m_snews_des: { type: String, required: true },
  m_snews_url: { type: String, required: true },
  m_snews_status: { type: Number, required: true },
  m_snews_added_on: { type: Date, required: true },
  m_snews_updated_on: { type: Date, required: true }
});

module.exports = mongoose.model("master_studenṭnews_tbl", SNewsSchema);