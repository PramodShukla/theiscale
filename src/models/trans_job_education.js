const mongoose = require('mongoose');

const TransactionEducationSchema = new mongoose.Schema({
  trans_eduid: {
    type: Number,
    required: true,
    unique: true
  },
  trans_edujobid: {
    type: Number,
    required: true
  },
  trans_edutype: {
    type: Number,
    required: true
  },
  trans_educourse: {
    type: Number,
    required: true
  },
  trans_edu_speclization: {
    type: Number,
    required: true
  },
  trans_created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('trans_job_education', TransactionEducationSchema);