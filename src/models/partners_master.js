const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    partner_name: {
      type: String,
      required: true,
      trim: true,
    },

    partner_url: {
      type: String,
      default: null,
      trim: true,
    },

    partner_image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("partners", partnerSchema);