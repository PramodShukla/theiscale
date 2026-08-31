const mongoose = require("mongoose");

const hiringFormSchema = new mongoose.Schema(
  {
    organization_type: {
      type: String,
      enum: [
        "Proprietorship Firm",
        "Partnership Firm",
        "Private Limited Company",
        "One Person Company",
        "Limited Liability Company",
      ],
      default: null,
    },

    organization_name: {
      type: String,
      default: null,
      trim: true,
    },

    hr_email_1: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    hr_email_2: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    hr_contact_no: {
      type: String,
      default: null,
    },

    whatsapp_no: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "hiring_form",
  hiringFormSchema
);