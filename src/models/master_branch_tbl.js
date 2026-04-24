const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  // m_branch_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_branch_name: {
    type: String,
    required: true,
    maxlength: 200
  },

  m_branch_status: {
    type: Number, 
    required: true,
    maxlength: 20
    // 1=active
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("master_branch_tbl", branchSchema);