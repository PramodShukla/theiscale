const mongoose = require('mongoose');

const professionalDetailSchema = new mongoose.Schema({
  // p_detail_id: {
  //   type: Number,
  //   required: true
  // },
  p_candidate: {
    type: Number,
    required: true
  },
  p_job_type: {
    type: String,
    required: true
  },
  p_company_name: {
    type: String,
    required: true
  },
  p_company_website: {
    type: String,
    required: true
  },
  p_company_industry: {
    type: String,
    required: true
  },
  p_company_function: {
    type: String,
    required: true
  },
  p_job_role: {
    type: String,
    required: true
  },
  p_joining_date: {
    type: Date,
    required: true
  },
  p_leaving_date: {
    type: Date,
    required: true
  },
  p_current_status: {
    type: Number,
    required: true
  },
  p_exprience: {
    type: String,
    required: true
  },
  p_salary: {
    type: Number,
    required: true
  },
  p_state: {
    type: Number,
    required: true
  },
  p_city: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('candidate_professional_detail', professionalDetailSchema);