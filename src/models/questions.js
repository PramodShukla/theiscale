const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    m_ques_id: {
      type: Number,
      // required: true,
    },

    m_ques_quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizs",
      required: true,
    },

    m_ques__topic_quiz: {
      type: Number,
      default: 0,
    },

    m_ques_level: {
      type: Number,
      // required: true,
    },

    m_ques_is_img: {
      type: Number,
      // required: true,
      default: 0,
      enum: [0, 1], // 0 = text, 1 = image
    },

    m_ques_title_en: {
      type: String,
      required: true,
    },

    // Options - Image flags
    m_ques_op1_is_img: {
      type: String,
      default: "0",
    },
    m_ques_op1_en: {
      type: String,
      // required: true,
    },

    m_ques_op2_is_img: {
      type: String,
      default: "0",
    },
    m_ques_op2_en: {
      type: String,
      // required: true,
    },

    m_ques_op3_is_img: {
      type: String,
      default: "0",
    },
    m_ques_op3_en: {
      type: String,
      // required: true,
    },

    m_ques_op4_is_img: {
      type: String,
      default: "0",
    },
    m_ques_op4_en: {
      type: String,
      // required: true,
    },

    m_ques_ans: {
      type: String,
      // required: true,
      enum: ["A", "B", "C", "D"], // Answer can only be one of these
    },

    m_quiz_instructions: {
      type: String,
      // required: true,
    },

    m_ques_solutions: { type: String,},

    m_quiz_added_on: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

module.exports = mongoose.model("questions", QuestionSchema);
