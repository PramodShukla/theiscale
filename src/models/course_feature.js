const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    // m_feature_id: {
    //   type: Number,
    //   default: null,
    // },

    m_feature_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    m_feature_course_slug: {
      type: String,
      // required: true,
      maxlength: 200,
    },

    m_feature_image: {
      type: String,
      // required: true,
      default: null,
    },

    m_feature_title: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true,
    },

    m_feature_desc: {
      type: String,
      // required: true,
      trim: true,
    },

    m_feature_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
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
  },
);

module.exports = mongoose.model("course_feature", featureSchema);
