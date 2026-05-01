const mongoose = require("mongoose");

const jobEnrollmentSchema = new mongoose.Schema({
  // m_je_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  m_je_job: {
    type: String,
    required: true,
    maxlength: 20
  },

  m_je_user: {
    type: String,
    required: true,
    maxlength: 20
  },

  m_je_status: {
    type: String,
    required: true,
    maxlength: 10
  },

  m_je_added_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("job_enroll", jobEnrollmentSchema);