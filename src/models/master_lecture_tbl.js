const mongoose = require('mongoose');

const mLectureSchema = new mongoose.Schema({
  // mlecture_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  ml_category: { type: Number, default: null, required: false },
  ml_course: { type: Number, default: null, required: false },
  ml_subject: { type: Number, required: true },
  ml_title: { type: String, default: null, required: false },
  ml_code: { type: String, default: null, required: false },
  ml_status: { type: Number, default: null, required: false  }, // 1 = Active
  ml_type: { type: Number, default: null, required: false }, // 1 Link, 2 Video, 3 Audio, 4 Image, 5 PDF, 6 Other
  ml_stype: { type: String, required: true },
  ml_yt_type: { type: String, default: "1", required: true },
  ml_file: { type: String, default: null, required: false }, //ocl_type=1 then link else file title	
  ml_video_id: { type: String, required: true },
  ml_date: { type: Date, default: null },
  ml_time: { type: String, default: null },
  ml_added_by: { type: Number, default: null },
  ml_added_on: { type: Date, default: null },
  ml_modified_by: { type: Number, default: null },
  ml_modified_on: { type: Date, default: null },

  // Quiz fields
  ml_quize_keyword: { type: String, required: true },
  ml_quize_durration: { type: String, required: true },
  ml_quize_icon: { type: String, required: true },
  ml_quize_banner: { type: String, required: true },
  ml_quiz_per_marks: { type: Number, required: true },
  ml_quiz_pernegative_marks: { type: Number, required: true },
  ml_quiz_shortDesc: { type: String, required: true },
  ml_quiz_description: { type: String, required: true },
  ml_quiz_remark: { type: String, required: true },
  ml_quiz_enddate: { type: String, required: true },
  ml_quiz_endTime: { type: String, required: true },
  ml_quiz_type: { type: Number, required: true },

  ml_pdffile: { type: String, required: true },
  ml_seq: { type: Number, required: true }
});

module.exports = mongoose.model('master_lecture_tbl', mLectureSchema);