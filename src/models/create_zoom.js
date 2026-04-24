const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  class_date: {
    type: Date,
    required: true
  },
  class_time: {
    type: String, // MySQL TIME → String
    required: true
  },
  join_url: {
    type: String,
    required: true
  },
  host_url: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  meeting_id: {
    type: String,
    required: true
  },
  start_time: {
    type: String, // MySQL TIME → String
    required: true
  },
  meeting_password: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('create_zoom', meetingSchema);