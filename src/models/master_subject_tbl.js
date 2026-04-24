const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  m_subject_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_subject_title: { type: String, required: true },
  m_subject_icon: { type: String, required: true },
  m_subject_desc: { type: String, required: true },
  m_subject_for: { type: Number, required: true }, // 1-Course, 2-Notes
  m_subject_typeid: { type: Number, required: true }, // Course id or Notes id
  m_subject_course_slug: { type: String, required: true },
  m_subject_seq: { type: Number, required: true },
  m_subject_status: { type: Number, required: true }
});

module.exports = mongoose.model("master_subject_tbl", SubjectSchema);