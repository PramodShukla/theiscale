const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  result_id: {
    type: Number,
    required: true,
    unique: true
  },
  result_applied_id: {
    type: Number,
    required: true
  },
  result_rollno: {
    type: Number,
    required: true
  },
  result_rollprefix: {
    type: String,
    required: true
  },
  result_date: {
    type: Date,
    required: true
  },
  result_testid: {
    type: Number,
    required: true
  },
  result_userid: {
    type: Number,
    required: true
  },
  result_score: {
    type: String,
    required: true
  },
  result_grade: {
    type: String,
    required: true
  },
  result_status: {
    type: String,
    required: true
  },
  result_authenticity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('test_result', ResultSchema);