const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  subject_id: {
    type: Number,
    required: true
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

module.exports = mongoose.model('subject_rating', ReviewSchema);