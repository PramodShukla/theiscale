const mongoose = require('mongoose');

const addCourseSchema = new mongoose.Schema({
  // add_course_id: {
  //   type: Number,
  //   required: true
  // },
  add_course_candidate: {
    type: Number,
    required: true
  },
  add_course_type: {
    type: String,
    required: true
  },
  add_course_title: {
    type: String,
    required: true
  },
  add_course_start: {
    type: Date,
    required: true
  },
  add_course_end: {
    type: Date,
    required: true
  },
  add_course_desc: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('candidate_additional_course', addCourseSchema);