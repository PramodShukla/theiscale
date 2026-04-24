const mongoose = require("mongoose");

const StSchema = new mongoose.Schema({
  m_st_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_st_video: { type: String, required: true },
  m_st_url: { type: String, required: true },
  m_st_status: { type: Number, required: true },
  m_st_added_on: { type: Date, required: true },
  m_st_updated_on: { type: Date, required: true }
});

module.exports = mongoose.model("master_stdtestimonial_tbl", StSchema);