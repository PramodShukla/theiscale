const mongoose = require("mongoose");

const SSSchema = new mongoose.Schema({
  m_ss_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately

  m_ss_name: { type: String, required: true },
  m_ss_placed: { type: String, required: true },
  m_ss_exp: { type: String, required: true },

  m_ss_package_from: { type: String, required: true },
  m_ss_package_to: { type: String, required: true },
  m_ss_package_type: { type: String, required: true },

  m_ss_video: { type: String, required: true },

  m_ss_status: { type: String, required: true },

  m_ss_added_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model("master_success_story_tbl", SSSchema);