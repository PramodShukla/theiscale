const mongoose = require("mongoose");

const parentDetailsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT representation
  },

  user_id: {
    type: Number,
    required: true
  },

  m_father_name: {
    type: String,
    required: true
  },

  m_mother_name: {
    type: String,
    required: true
  },

  m_f_occupation: {
    type: String,
    required: true
  },

  m_m_occupation: {
    type: String,
    required: true
  },

  m_mobile_number: {
    type: String,
    required: true,
    maxlength: 256
  }
});

module.exports = mongoose.model("master_users_parents", parentDetailsSchema);