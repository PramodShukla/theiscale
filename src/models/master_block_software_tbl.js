const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  // m_block_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_block_app_name: {
    type: String,
    required: true
  },

  m_block_app_extn: {
    type: String,
    required: true,
    maxlength: 200
  }
});

module.exports = mongoose.model("master_block_software_tbl", blockSchema);