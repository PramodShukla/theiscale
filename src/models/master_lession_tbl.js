const mongoose = require('mongoose');

const mLessionSchema = new mongoose.Schema({
  // mlession_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  mlsn_category: { type: Number, default: null },
  mlsn_subject: { type: Number, default: null },
  mlsn_title: { type: String, default: null },
  mlsn_code: { type: String, default: null },
  mlsn_status: { type: Number, default: null }, // 1 = Active
  mlsn_added_by: { type: Number, default: null },
  mlsn_added_on: { type: Date, default: null },
  mlsn_modified_by: { type: Number, default: null },
  mlsn_modified_on: { type: Date, default: null }
});

module.exports = mongoose.model('master_lession_tbl', mLessionSchema);