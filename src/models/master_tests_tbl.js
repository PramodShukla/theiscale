const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  test_mode: { type: Number, required: true }, // 1-Offline 2-Online

  test_title: { type: String, default: null },
  test_code: { type: String, default: null },
  test_category: { type: String, default: null },

  test_state: { type: Number, required: true },
  test_city: { type: String, default: null },
  exam_city: { type: String, required: true },

  test_date: { type: Date, default: null },
  test_lastDate: { type: Date, default: null },

  test_day: { type: String, default: null },
  test_startTime: { type: String, default: null },

  test_center: { type: String, default: null },
  test_description: { type: String, default: null },
  test_centerAddress: { type: String, default: null },

  test_duration: { type: Number, default: 0 }, // in minutes

  test_totalMarks: { type: String, default: null },
  test_passMarks_percent: { type: String, default: null },
  test_qualifyGrade: { type: String, default: null },

  test_syllabus: { type: String, default: null },
  test_reportingTime: { type: String, default: null },
  test_eligibility: { type: String, default: null },

  test_instituteCandidate_fee: { type: String, default: null },
  test_passedCandidate_fee: { type: String, default: null },

  test_idProof: { type: String, default: null },

  test_managerContact: { type: String, default: null },
  test_managerEmail: { type: String, default: null },

  test_questionPaper: { type: String, default: null },
  test_answerKey: { type: String, default: null },

  test_ispublish: {
    type: Number,
    default: 1 // 1-ExamAdmin 2-All
  },

  test_type: {
    type: Number,
    required: true // 1=main test, 2=mock test
  },

  test_passkey: {
    type: String,
    required: true
  },

  positive_marks: { type: Number, default: 0 },
  negative_marks: { type: Number, default: 0 },

  instruction: { type: String, default: null },

  test_publish: {
    type: Number,
    default: 0 // 1=publish, 0=not publish
  },

  test_for: {
    type: Number,
    required: true // 1-DPET 2-GPET
  },

  use_code: { type: String, required: true },

  test_deletestatus: {
    type: Number,
    default: 0 // 0-No 1-Yes
  },

  test_created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("master_tests_tbl", testSchema);