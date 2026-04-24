const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    // m_course_id: {
    //   type: Number,
    //   default: null,
    // },

    m_course_lang: {
      type: Number,
      required: true,
    },

    m_course_category: {
      type: Number,
      required: true,
    },

    m_course_cat_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_title: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_slung: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_intro: {
      type: String,
      required: true,
    },

    m_course_code: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_banner: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_pdf: {
      type: String,
      default: null,
    },

    m_course_video_link: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_course_video_id: {
      type: String,
      required: true,
    },

    m_course_description: {
      type: String,
      required: true,
    },

    m_course_type: {
      type: Number,
      required: true, 
      enum: [1, 2] // 1-Free, 2-Paid
    },

    m_course_price: {
      type: Number,
      required: true,
    },

    m_course_offer_price: {
      type: Number,
      required: true,
    },

    m_course_modified: {
      type: Date,
      default: Date.now,
      required: true,
    },

    m_course_popular: {
      type: Number,
      default: 0,
    },

    m_course_recomended: {
      type: Number,
      default: 0,
    },

    m_course_keyword: {
      type: String,
      default: null,
      maxlength: 256,
    },

    m_course_durration: {
      type: String,
      required: true,
    },

    m_course_status: {
      type: Number,
      required: true,
    },

    m_course_status_web: {
      type: Number,
      required: true,
    },

    m_course_view: {
      type: Number,
      default: 0,
      required: true,
    },

    m_course_like: {
      type: Number,
      default: 0,
      required: true,
    },

    m_course_dislike: {
      type: Number,
      default: 0,
    },

    m_course_rating: {
      type: Number,
      required: true,
    },

    m_course_reviews: {
      type: Number,
      required: true,
    },

    m_course_brochure: {
      type: String,
      required: true,
    },

    m_course_duration: {
      type: String,
      required: true,
    },

    m_course_durration_web: {
      type: Number,
      required: true,
    },

    m_course_trainee: {
      type: String,
      required: true,
      // master_terms_tbl se lana hai 
    },

    m_course_feestructure: {
      type: String,
      required: true,
    },

    m_course_certificate: {
      type: Number,
      required: true, 
      enum: [1, 2] // 1-yes, 2-no
    },

    m_course_app_g_link: {
      type: String,
      required: true,
    },

    m_course_web_g_link: {
      type: String,
      required: true,
    },

    m_course_graphy_instruction: {
      type: String,
      required: true,
    },

    m_course_share: {
      type: Number,
      default: 0,
    },

    m_course_order: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("master_course_tbl", courseSchema);