const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true
  // },
  examcode: {
    type: String,
    required: true
  },
  schedule_id: {
    type: Number,
    required: true
  },
  subject_code: {
    type: String,
    required: true
  },
  question_type: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  question: {
    type: String,
    required: false,
    default: null
  },
  option_A: {
    type: String,
    required: false,
    default: null
  },
  option_B: {
    type: String,
    required: false,
    default: null
  },
  option_C: {
    type: String,
    required: false,
    default: null
  },
  option_D: {
    type: String,
    required: false,
    default: null
  },
  image_A: {
    type: String,
    required: false,
    default: null
  },
  image_B: {
    type: String,
    required: false,
    default: null
  },
  image_C: {
    type: String,
    required: false,
    default: null
  },
  image_D: {
    type: String,
    required: false,
    default: null
  },
  correct_option: {
    type: String,
    required: false,
    default: null
  },
  solution: {
    type: String,
    required: false,
    default: null
  },
  mark_wrong: {
    type: Number,
    required: false,
    default: 0
  },
  remember_token: {
    type: String,
    required: false,
    default: null
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

module.exports = mongoose.model('exam_question', questionSchema);