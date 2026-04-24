const mongoose = require('mongoose');

const MultiReviewSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  review_for: {
    type: Number,
    default: null // 1-course 2-test 3-notes, 4-webinar
  },
  user_id: {
    type: Number,
    required: true
  },
  course_id: {
    type: Number,
    required: true
  },
  notes_id: {
    type: Number,
    default: null
  },
  package_id: {
    type: Number,
    default: null
  },
  webinar_id: {
    type: Number,
    default: null
  },
  rating: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  added_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('testimonials_tbl', MultiReviewSchema);