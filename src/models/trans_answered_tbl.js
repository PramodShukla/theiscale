const mongoose = require('mongoose');

const TransactionAnswerSchema = new mongoose.Schema({
  trans_answer_id: {
    type: Number,
    required: true,
    unique: true
  },
  t_quiz_id: {
    type: Number,
    required: true
  },
  t_user_id: {
    type: Number,
    required: true
  },
  t_ques_id: {
    type: Number,
    required: true
  },
  t_ques_answer: {
    type: String,
    required: true
  },
  t_points_earned: {
    type: Number,
    required: true
  },
  t_amount_earned: {
    type: Number,
    required: true
  },
  t_ans_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('trans_answered_tbl', TransactionAnswerSchema);