const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  // m_client_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_client_name: {
    type: String,
    required: true
  },

  m_client_logo: {
    type: String,
    required: true
  },

  m_client_company: {
    type: String,
    required: true
  },

  m_client_description: {
    type: String,
    required: true
  },

  m_client_order: {
    type: Number,
    required: true
  },

  m_client_status: {
    type: String,
    required: true,
    maxlength: 20
  },

  m_client_added_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("master_client_tbl", clientSchema);