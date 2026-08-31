const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company_requirement",
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidates",
    required: true
  },

  applied_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("company_requirement_application", jobApplicationSchema);