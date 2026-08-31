const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentQuestionSchema = new Schema(
  {
    stud_test_id: {
      type: Number,
      required: true,
      index: true,
    },

    stud_subject_id: {
      type: Number,
      required: true,
      index: true,
    },

    stud_ques_id: {
      type: Number,
      required: true,
      index: true,
    },

    stud_ques_ans: {
      type: String,
      default: null,
    },

    stud_ques_status: {
      type: Number,
      required: true,
      default: 0,
      // 0 = Not Solved
      // 1 = Correct
      // 2 = Wrong
      // 3 = Incorrect question
      enum: [0, 1, 2, 3],
    },

    stud_ques_marks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

module.exports = mongoose.model('student_test_question', StudentQuestionSchema);