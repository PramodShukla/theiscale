const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  // institute_id: {
  //   type: Number,
  //   required: true,
  //   auto: true
  // },

  institute_register_date: {
    type: Date,
    required: true
  },

  institute_placementOfficer_name: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_placementOfficer_email: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_placementOfficer_contact: {
    type: Number,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_placementOfficer_designation: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_name: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_websiteLink: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_email: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_contact: {
    type: Number,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_placementDepart_email: {
    type: String,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_placementDepart_contact: {
    type: Number,
    required: false,
    maxlength: 255,
    default: null
  },

  institute_address: {
    type: String,
    required: false
  },

  institute_description: {
    type: String,
    required: false,
    default: null
  },

  institute_courseDescription: {
    type: String,
    required: false,
    default: null
  }
});

module.exports = mongoose.model("master_institutes_tbl", instituteSchema);