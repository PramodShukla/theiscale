const mongoose = require("mongoose");

const leadGenerateSchema = new mongoose.Schema(
  {
    

    m_lg_title: {
      type: String,
      required: true,
      trim: true,
    },

    m_lg_slug: {
      type: String,
      required:true,
      unique:true,
      index:true
    },

    m_lg_desc: {
      type: String,
      default: null,
    },

    m_lg_redirect_link: {
      type: String,
      default: null,
    },

   

    m_lg_college: {
      type: Number,
      default: 0,
    },

    m_lg_education: {
      type: Number,
      default: 0,
    },

    m_lg_field_of_study: {
      type: Number,
      default: 0,
    },

    m_lg_branch: {
      type: Number,
      default: false,
    },

    m_lg_passing_year: {
      type: Number,
      default: 0,
    },

    m_lg_state: {
      type: Number,
      default: 0,
    },

    m_lg_gender: {
      type: Number,
      default: 0,
    },

    m_lg_laptop_desktop: {
      type: Number,
      default: 0,
    },

    m_lg_working_professional: {
      type: Number,
      default: 0,
    },



    m_lg_status: {
      type: Number,
      enum: [0,1],
      default: 1,
    },

  

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "lead_generate",
  leadGenerateSchema
);