const mongoose = require('mongoose');

const leadDataSchema = new mongoose.Schema({
  // data_id: {
  //   type: Number,
  //   required: true
  // },
  data_lead_id: {
    type: String,
    required: true
  },
  data_name: {
    type: String,
    required: true
  },
  data_mobile: {
    type: Number,
    required: true
  },
  data_whatsapp: {
    type: Number,
    required: true
  },
  data_email: {
    type: String,
    required: true
  },
  data_gender: {
    type: String,
    required: false,
    default: null
  },
  data_college_name: {
    type: String,
    required: true
  },
  data_qualification: {
    type: String,
    required: true
  },
  data_study_field: {
    type: String,
    required: true
  },
  data_branch: {
    type: String,
    required: true
  },
  data_passing_year: {
    type: String,
    required: true
  },
  data_state: {
    type: Number,
    required: true
  },
  data_accessories: {
    type: String,
    required: true
  },
  data_profession: {
    type: String,
    required: true
  },
  data_status: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('data_analytics', leadDataSchema);