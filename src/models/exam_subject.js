const mongoose = require('mongoose');

const examQuestionSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true
  // },
  exam_id: {
    type: Number,
    required: true
  },
  schedule_id: {
    type: Number,
    required: true
  },
  quesbank_id: {
    type: Number,
    required: false,
    default: 0
  },
  subject_id: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: false,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('exam_subject', examQuestionSchema);