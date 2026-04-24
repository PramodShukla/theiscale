const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    t_student_id: {
      type: Number,
      required: true,
      index: true,
    },

    t_review_for: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
      // 1 = course, 2 = test_series, 3 = notes
    },

    t_review_course: {
      type: Number,
      required: true,
      index: true,
    },

    t_review_remarks: {
      type: String,
      required: true,
    },

    t_review_rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    t_review_date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    t_review_status: {
      type: Number,
      required: true,
      default: 1, // you can define: 1 = active, 0 = inactive, etc.
    },
  },
  {
    timestamps: false, // because custom date field already exists
  }
);

module.exports = mongoose.model('students_reviews_tbl', ReviewSchema);