const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  // interview_id: {
  //   type: Number,
  //   required: true
  // },
  interview_date: {
    type: Date,
    required: true
  },
  interview_day: {
    type: String,
    required: true
  },
  interview_reporting: {
    type: String, // MySQL TIME → String
    required: true
  },
  interview_candidate_total: {
    type: Number,
    required: true
  },
  interview_scheduled_date: {
    type: Date,
    required: true
  },
  interview_jobid: {
    type: Number,
    required: true
  },
  interview_companyid: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('interview_schedule', interviewSchema);