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
      default: null,
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
      type: Boolean,
      default: false,
    },

    m_lg_education: {
      type: Boolean,
      default: false,
    },

    m_lg_field_of_study: {
      type: Boolean,
      default: false,
    },

    m_lg_branch: {
      type: Boolean,
      default: false,
    },

    m_lg_passing_year: {
      type: Boolean,
      default: false,
    },

    m_lg_state: {
      type: Boolean,
      default: false,
    },

    m_lg_gender: {
      type: Boolean,
      default: false,
    },

    m_lg_laptop_desktop: {
      type: Boolean,
      default: false,
    },

    m_lg_working_professional: {
      type: Boolean,
      default: false,
    },



    m_lg_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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