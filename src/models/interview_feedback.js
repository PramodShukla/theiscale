const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // feedback_id: {
  //   type: Number,
  //   required: true
  // },
  feedback_interview: {
    type: Number,
    required: true
  },
  feedback_date: {
    type: Date,
    required: true
  },
  feedback_candidate_id: {
    type: Number,
    required: true
  },
  feedback_candidate_mobile: {
    type: Number,
    required: true
  },
  feedback_candidate_name: {
    type: String,
    required: true
  },
  feedback_candidate_email: {
    type: String,
    required: true
  },
  feedback_comment: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('interview_feedback', feedbackSchema);