const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  m_level_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_level_title: { type: String, required: true },
  m_level_desc: { type: String, required: true },
  m_level_order: { type: Number, required: true },
  m_level_ques_time: { type: String, required: true }, // SQL TIME → String (HH:mm:ss)
  m_level_point: { type: Number, required: true },
  m_level_status: { type: Number, required: true }
});

module.exports = mongoose.model("master_ques_levels", LevelSchema);