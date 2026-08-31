const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    quesbank_id: {
      type: String,
      required: true,
      trim: true,
    },

    subject_code: {
      type: String,
      required: true,
      trim: true,
    },

    question_type: {
      type: Number,
      required: true,
      enum: [1, 2], // 1 = objective, 2 = written
      default: 1,
    },

    image: {
      type: String,
      default: null,
    },

    question: {
      type: String,
      default: null,
    },

    option_A: {
      type: String,
      default: null,
    },

    option_B: {
      type: String,
      default: null,
    },

    option_C: {
      type: String,
      default: null,
    },

    option_D: {
      type: String,
      default: null,
    },

    image_A: {
      type: String,
      default: null,
    },

    image_B: {
      type: String,
      default: null,
    },

    image_C: {
      type: String,
      default: null,
    },

    image_D: {
      type: String,
      default: null,
    },

    correct_option: {
      type: String,
      default: null,
    },

    solution: {
      type: String,
      default: null,
    },

    mark_wrong: {
      type: Number,
      default: 0,
    },

    remember_token: {
      type: String,
      default: null,
      maxlength: 100,
    },
  },
  {
    timestamps: true, // created_at + updated_at automatically
  }
);

module.exports = mongoose.model('quesbank_question', QuestionSchema);