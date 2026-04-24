const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    type: {
      type: Number,
      enum: [1, 2, 3, 4], 
      // 1 => course, 2 => test, 3 => notes, 4 => webinar
      default: null,
    },

    course_id: {
      type: Number,
      default: 0,
      index: true,
    },

    notes_id: {
      type: Number,
      default: 0,
      index: true,
    },

    package_id: {
      type: Number,
      default: 0,
      index: true,
    },

    webinar_id: {
      type: Number,
      default: 0,
      index: true,
    },

    title: {
      type: String,
      default: null,
      maxlength: 300,
      trim: true,
    },

    feedback: {
      type: String,
      default: null,
    },

    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // because you already have custom "created"
  }
);

module.exports = mongoose.model('reports', FeedbackSchema);