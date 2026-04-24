const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  m_state_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_state_name: { type: String, required: true },
  m_state_country: { type: Number, required: true }
});

module.exports = mongoose.model("master_state_tbl", StateSchema);