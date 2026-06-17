const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: { type: String, required: true, trim: true },

  company_name: { type: String, required: true, trim: true },

  company_logo: { type: String, default: null },

  last_date_to_apply: { type: Date, default: null },

  // MULTIPLE LOCATIONS
  job_locations: [
    {
      type: String,
    },
  ],

  // SALARY RANGE
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },

  // per month / per annum
  salary_type: {
    type: String,
    enum: ["PM", "PA"],
    default: "PM",
  },

  // EXPERIENCE (Flexible)
  experience: {
    type: String,
    default: null,
  },

  job_description: { type: String, default: null },

  application_link: { type: String, default: null },

  // SOCIAL LINKS (FLEXIBLE)
  company_social_links: {
    linkedin: { type: String, default: null },
    website: { type: String, default: null },
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
  },

  slug: {
    type: String,
    unique: true,
    index: true,
  },

  status: {
    type: Number,
    enum: [0,1,2], //0-pending 1-active 2-expired
    default: 1,
  },

  // RECRUITER DETAILS
  recruiter_mobile_no: {
    type: String,
    default: null,
  },

  recruiter_whatsapp_no: {
    type: String,
    default: null,
  },

  recruiter_date: {
    type: Date,
    default: null,
  },

  recruiter_expire_date: {
    type: Date,
    default: null,
  },

  order: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: null,
  },

  
});

jobSchema.pre("save", function (next) {
  if (this.job_title) {
    this.slug = slugify(this.job_title, {
      lower: true,
      strict: true,
    });
  }
  next();
});


module.exports = mongoose.model("company_requirement", jobSchema);
