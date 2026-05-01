const mongoose = require("mongoose");

const MPreSchema = new mongoose.Schema(
  {
    // m_pre_id: {
    //   type: Number,
    //   required: true
    // },

    m_pre_name: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    m_pre_designation: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    m_pre_image: {
      type: String,
      required: true
    },

    m_pre_company: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    m_pre_company_img: {
      type: String,
      required: true
    },

    m_pre_video_link: {
      type: String,
      required: true
    },

    m_pre_status: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1] // 0-inactive, 1-active (assumption based on pattern)
    },

    m_pre_order: {
      type: Number,
      required: true,
      default: 0
    },

    m_pre_added_on: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("pre_placement_company", MPreSchema);