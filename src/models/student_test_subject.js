const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentExamResultSchema = new Schema(
  {
    exam_id: {
      type: Number,
      required: true,
      index: true,
    },

    stud_test_id: {
      type: Number,
      required: true,
      index: true,
    },

    stud_test_subId: {
      type: Number,
      required: true,
      index: true,
    },

    s_total_correct_ques: {
      type: Number,
      default: null,
    },

    s_total_wrong_ques: {
      type: Number,
      default: null,
    },

    s_total_not_ans: {
      type: Number,
      default: null,
    },

    s_total_incorrect_ques: {
      type: Number,
      default: 0,
    },

    s_total_score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

module.exports = mongoose.model('student_test_subject', StudentExamResultSchema);