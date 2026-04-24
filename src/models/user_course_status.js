const mongoose = require("mongoose");

const courseStatusSchema = new mongoose.Schema({
  u_course_statusid: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  u_course_subject: {
    type: Number,
    required: true
  },

  u_course_topic: {
    type: Number,
    required: true
  },

  u_course_userid: {
    type: Number,
    required: true
  },

  u_course_updated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("user_course_status", courseStatusSchema);