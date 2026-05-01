const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },

  company_name: { type: String, required: true },

  company_logo: { type: String, default: null },

  last_date_to_apply: { type: Date, },

  // MULTIPLE LOCATIONS
  job_locations: [
    {
      type: String
    }
  ],

  // SALARY RANGE
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },

  // per month / per annum
  salary_type: {
    type: String,
    enum: ["per_month", "per_annum"],
    default: "per_month"
  },

  // EXPERIENCE (Flexible)
  experience: {
    min: { type: Number, default: 0 }, // in months
    max: { type: Number, default: 0 }, // in months
    label: { type: String, default: null } // e.g. "0-2 years", "6 months"
  },

  job_description: { type: String, default: null },

  application_link: { type: String, default: null },

  // SOCIAL LINKS (FLEXIBLE)
  company_social_links: {
    linkedin: { type: String, default: null },
    website: { type: String, default: null },
    twitter: { type: String, default: null },
    instagram: { type: String, default: null }
  },

  status: {
    type: Number,
    default: 1 // 1=active, 0=inactive
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("company_requirement", jobSchema);