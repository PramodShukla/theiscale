const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    // m_feature_id: {
    //   type: Number,
    //   default: null,
    // },

    m_feature_course: {
      type: Number,
      required: true,
    },

    m_feature_course_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_feature_image: {
      type: String,
      required: true,
      maxlength: 255,
    },

    m_feature_title: {
      type: String,
      required: true,
      maxlength: 250,
    },

    m_feature_desc: {
      type: String,
      required: true,
    },

    m_feature_status: {
      type: Number,
      required: true,
    },

    m_feature_created: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("master_course_feature", featureSchema);