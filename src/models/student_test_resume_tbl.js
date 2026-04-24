const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentTestUrlSchema = new Schema(
  {
    stu_test_id: {
      type: Number,
      required: true,
      index: true,
    },

    test_url: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: false, // because no created_at / updated_at in table
  }
);

module.exports = mongoose.model('student_test_resume_tbl', StudentTestUrlSchema);