const mongoose = require('mongoose');

const mJuSchema = new mongoose.Schema({
  // m_ju_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  m_ju_title: { type: String, required: true },
  m_ju_slug: { type: String, required: true },
  m_ju_emp_type: { type: String, required: true },
  m_ju_role_respo: { type: String, required: true },
  m_ju_desire_skill: { type: String, required: true },
  m_ju_image: { type: String, required: true },
  m_ju_desc: { type: String, required: true },
  m_ju_func_area: { type: String, required: true },
  m_ju_interview_for: { type: String, required: true },
  m_ju_drive_name: { type: String, required: true },
  m_ju_vacancy: { type: String, required: true },
  m_ju_company: { type: String, required: true },
  m_ju_salary_from: { type: String, required: true },
  m_ju_salary_to: { type: String, required: true },
  m_ju_salary_type: { type: Number, required: true },
  m_ju_allowance: { type: String, required: true },
  m_ju_state: { type: String, required: true },
  m_ju_location: { type: String, required: true },
  m_ju_exp: { type: String, required: true },
  m_ju_qualification: { type: String, required: true },
  m_ju_recruit_mo: { type: Number, required: true },
  m_ju_recruit_whatsapp: { type: Number, required: true },
  m_ju_recruit_date: { type: Date, required: true },
  m_ju_exp_date: { type: Date, required: true },
  m_ju_mail_type: { type: String, required: true },
  m_ju_mail_reciev: { type: String, required: true },
  m_ju_mail: { type: String, required: true },
  m_ju_order: { type: String, required: true },
  m_ju_status: { type: String, required: true },
  m_ju_added_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('job_update', mJuSchema);