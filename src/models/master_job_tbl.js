const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  // m_job_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  m_job_uniqueid: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_category: {
    type: Number,
    required: true
  },

  m_job_education_scate: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_education_specialization: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_type: {
    type: String,
    required: true,
    //enum:[1,2,3] //1-Diploma 2-Graduate 3-Both
  },

  m_job_name: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_sector: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_company: {
    type: Number,
    required: true
  },

  m_job_recrut_date: {
    type: Date,
    required: true
  },

  m_job_recrut_lastdate: {
    type: Date,
    required: true
  },

  m_job_recrut_day: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_recrut_city: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_description: {
    type: String,
    required: true
  },

  m_job_recrut_venue: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_recrut_starttime: {
    type: String,
    required: true
  },

  m_job_report_time: {
    type: String,
    required: true
  },

  m_job_drive: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_role: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_functional_detail: {
    type: String,
    required: true
  },

  m_job_required_qualification: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_education_category: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_document_required: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_responsiblity: {
    type: String,
    required: true
  },

  m_job_experience: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_experience_max: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_location: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_state: {
    type: Number,
    required: true
  },

  m_job_skill_required: {
    type: String,
    required: true
  },

  m_job_employment_type: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_salary: {
    type: Number,
    required: true
  },

  m_job_salary_max: {
    type: Number,
    required: true,
    maxlength: 255
  },

  m_job_allowances: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_vecency: {
    type: Number,
    required: true
  },

  m_job_working_days: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_recru_hrmanage_contact: {
    type: Number,
    required: true,
    maxlength: 255
  },

  m_job_recru_hrmanage_email: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_downlaod_callletter: {
    type: Number,
    required: true
  },

  job_po_name: {
    type: String,
    required: true,
    maxlength: 255
  },

  job_po_contactno: {
    type: Number,
    required: true,
    maxlength: 200
  },

  job_po_emailid: {
    type: String,
    required: true,
    maxlength: 200
  },

  m_job_mailrecive: {
    type: Number,
    required: true
    // 1-New Apply 2-Daily Summry
  },

  m_job_response_recieve_mailid: {
    type: Number,
    required: true
    // 1-Company 2-Recuruiter 3-HR Dept
  },

  m_job_response_mail_id: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_job_recruiter_mobile: {
    type: String,
    required: true,
    maxlength: 255
  },

  recruiter_mobile_verify: {
    type: Number,
    required: true,
    enum:[0,1] // 0-No 1-Yes	
  },

  recruiter_mobile_otp: {
    type: String,
    required: true,
    maxlength: 200
  },

  m_job_campus: {
    type: Number,
    required: true
    // 1-on compus 2-off compus
  },

  m_job_status: {
    type: Number,
    required: true,
    enum:[0,1,2] // 0-pending 1-active 2-expired
  },

  m_job_posted: {
    type: Date,
    required: true
  },

  m_job_isverified: {
    type: Number,
    required: true,
    enum:[0,1] // 0-Not Verfied 1- Verfied
  },

  m_job_ishot: {
    type: Number,
    required: true,
    enum:[0,1] // 0-No 1-Yes	
  },

  m_job_premium: {
    type: Number,
    required: true,
    enum:[0,1] // 0-No 1-Yes	
  },

  m_job_squence: {
    type: Number,
    required: true
  },

  m_job_time: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("master_job_tbl", jobSchema);