const mongoose = require("mongoose");

const leadDataSchema = new mongoose.Schema(
  {
    // data_id: {
    //   type: Number,
    //   required: true
    // },
    data_lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead_generate",
      required: true,
    },
    data_name: {
      type: String,
      required: true,
    },
    data_mobile: {
      type: String,
      required: true,
    },
    data_whatsapp: {
      type: String,
      required: true,
    },
    data_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    data_gender: {
      type: String,
      required: false,
      default: null,
    },
    data_college_name: {
      type: String,
      required: false,
      default: null,
    },
    data_qualification: {
      type: String,
      required: false,
      default: null,
    },
    data_study_field: {
      type: String,
      required: false,
      default: null,
    },
    data_branch: {
      type: String,
      required: false,
      default: null,
    },
    data_passing_year: {
      type: String,
      required: false,
      default: null,
    },
    data_state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      required: false,
      default: null,
    },
    data_accessories: {
      type: String,
      required: false,
      default: null,
    },
    data_profession: {
      type: String,
      required: false,
      default: null,
    },
    data_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("data_analytics", leadDataSchema);
