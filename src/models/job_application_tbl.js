const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // application_id: {
  //   type: Number,
  //   required: true
  // },
  application_job: {
    type: Number,
    required: true
  },
  application_company: {
    type: Number,
    required: true
  },
  application_candidate: {
    type: Number,
    required: true
  },
  application_date: {
    type: Date,
    required: true
  },
  application_resume: {
    type: String,
    required: true
  },
  application_status: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4] // 1: accept, 2: decline, 3: review application, 4: shortlisted
  },
  application_interview: {
    type: Number, // interview id
    required: true
  },
  is_callletter_genrated: {
    type: Number,
    required: true
  },
  is_letter_visible: {
    type: Number,
    required: true,
    enum: [0, 1] // 0: yes, 1: no
  },
  letter_expiry_date: {
    type: Date,
    required: false,
    default: null
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('job_application_tbl', applicationSchema);