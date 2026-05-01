const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  s_test_student: {
    type: Number,
    required: true
  },
  s_test_id: {
    type: Number,
    required: true
  },
  s_schedule_id: {
    type: Number,
    required: true
  },
  s_test_duration: {
    type: String,
    default: null
  },
  s_test_status: {
    type: Number,
    default: 0
  },
  s_test_marks: {
    type: Number,
    default: 0
  },
  s_test_webcam_img: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('student_test', TestSchema);