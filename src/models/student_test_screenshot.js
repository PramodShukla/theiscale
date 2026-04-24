const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentTestImageSchema = new Schema(
  {
    s_test_id: {
      type: Number,
      required: true,
      index: true,
    },

    student_id: {
      type: Number,
      required: true,
      index: true,
    },

    img_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false, // because MySQL me sirf created_at hai
    },
  }
);

module.exports = mongoose.model('student_test_screenshot', StudentTestImageSchema);