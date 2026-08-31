const mongoose = require("mongoose");

const transUQuizSchema = new mongoose.Schema({
  trans_uquiz_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  t_quiz_id: {
    type: Number, // bigint(20)
    required: true
  },

  t_user_id: {
    type: Number, // bigint(20)
    required: true
  },

  t_total_ques: {
    type: Number, // bigint(20)
    required: true
  },

  t_total_ques_attempt: {
    type: Number,
    required: true
  },

  t_correct_ans: {
    type: String, // varchar(100)
    required: true,
    maxlength: 100
  },

  t_wrong_ans: {
    type: String, // varchar(100)
    required: true,
    maxlength: 100
  },

  t_total_marks: {
    type: String, // varchar(100)
    default: null,
    maxlength: 100
  },

  t_total_minus_marks: {
    type: String, // varchar(100)
    required: true,
    maxlength: 100
  },

  t_obtained_marks: {
    type: String, // varchar(100)
    required: true,
    maxlength: 100
  },

  t_quiz_time: {
    type: String,
    required: true,
    maxlength: 200
  },

  t_ans_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("trans_user_quizes", transUQuizSchema);