const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidates",
    required: true,
  },
  lecture_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lecture",
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    default: null,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    default: null,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  completed_at: Date
}, { timestamps: true });

// duplicate avoid
lectureProgressSchema.index({ user_id: 1, lecture_id: 1 }, { unique: true });

module.exports = mongoose.model("lecture_progress", lectureProgressSchema);
