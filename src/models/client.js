const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  m_client_name: {
    type: String,
    required: true,
    trim: true
  },

  m_client_logo: {
    type: String,
    default: null   // ❌ remove required
  },

  m_client_company: {
    type: String,
    default: null   // optional
  },

  m_client_description: {
    type: String,
    default: null   // ❌ remove required
  },

  m_client_order: {
    type: Number,
    default: 0
  },

  m_client_status: {
    type: String,
    default: "active",   // better
    enum: ["active", "inactive"]
  },

  m_client_added_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("client", clientSchema);  