const mongoose = require('mongoose');

const TransactionAllowanceSchema = new mongoose.Schema({
  trans_allowanceid: {
    type: Number,
    required: true,
    unique: true
  },
  trans_jobid: {
    type: Number,
    required: true
  },
  trans_job_allowno: {
    type: Number,
    required: true
  },
  trans_allowance: {
    type: String,
    required: true
  },
  trans_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('trans_job_allowance', TransactionAllowanceSchema);