const mongoose = require("mongoose");

const transQuizSchema = new mongoose.Schema({
  trans_quiz_id: {
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
    type: Number,
    required: true
  },

  t_correct_ans: {
    type: Number,
    required: true
  },

  t_total_marks: {
    type: Number,
    required: true
  },

  t_wrong_ans: {
    type: Number,
    required: true
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

module.exports = mongoose.model("trans_user_course_quizes", transQuizSchema);