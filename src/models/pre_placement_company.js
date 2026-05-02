const mongoose = require("mongoose");

const MPreSchema = new mongoose.Schema(
  {
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
      default: null   
    },

    m_pre_company: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    m_pre_company_img: {
      type: String,
      default: null  
    },

    m_pre_video_link: {
      type: String,
      default: null 
    },

    m_pre_status: {
      type: Number,
      default: 1,
      enum: [0, 1]
    },

    m_pre_order: {
      type: Number,
      default: 0
    },

    m_pre_added_on: {
      type: Date,
      default: Date.now   
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("pre_placement_company", MPreSchema);