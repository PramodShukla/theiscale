const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    // m_package_id: {
    //   type: Number,
    //   required: true
    // },

    m_package_type: {
      type: Number,
      required: true,
    //   enum: [1, 2], // 1-free, 2-paid
    },

    m_package_course_id: {
      type: Number,
      required: true
    },

    m_package_title: {
      type: String,
      required: true,
      maxlength: 200
    },

    m_package_slug: {
      type: String,
      required: true,
      maxlength: 250
    },

    m_package_banner: {
      type: String,
      required: true,
      maxlength: 200
    },

    m_package_price: {
      type: Number,
      required: true
    },

    m_package_offer_price: {
      type: Number,
      required: true
    },

    m_package_category: {
      type: Number,
      required: true
    },

    m_package_intro: {
      type: String,
      required: true
    },

    m_package_desc: {
      type: String,
      required: true
    },

    m_package_modified: {
      type: Date,
      default: Date.now,
      required: true
    },

    m_package_total_test: {
      type: Number,
      required: true
    },

    m_package_rating: {
      type: Number,
      required: true
    },

    m_package_status: {
      type: Number,
      required: true
    },

    m_package_order: {
      type: Number,
      required: true
    },

    m_package_share: {
      type: Number,
      default: 0
    },

    m_package_reviews: {
      type: Number,
      default: null
    },

    m_package_language: {
      type: String,
      default: null,
      maxlength: 100
    },

    m_package_students: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("packages", PackageSchema);