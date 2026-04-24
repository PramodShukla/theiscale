const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
  qb_id: {
    type: Number,
    required: true
  },
  qb_title: {
    type: String,
    required: true
  },
  qb_desc: {
    type: String,
    required: false,
    default: null
  },
  qb_status: {
    type: Number,
    required: true,
    default: 0
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('master_quesbank_tbl', questionBankSchema);