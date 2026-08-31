const mongoose = require('mongoose');

const TransactionAnswerDetailSchema = new mongoose.Schema({
  tr_ans_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  trans_answer_id: {
    type: Number,
    required: true
  },
  trans_quez_id: {
    type: Number,
    required: true
  },
  trans_ques_id: {
    type: String,
    required: true
  },
  trans_is_attempt: {
    type: Number,
    required: true // 1=attempt, 0=not attempt
  },
  trans_right_ans: {
    type: String,
    required: true
  },
  trans_given_ans: {
    type: String,
    required: true
  },
  trans_wrong_answer: {
    type: String,
    required: true
  },
  trans_right_mark: {
    type: String,
    required: true
  },
  trans_neg_mark: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('trans_quiz_answers', TransactionAnswerDetailSchema);