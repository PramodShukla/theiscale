const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    partner_name: {
      type: String,
      required: true,
      trim: true,
    },

    partner_url: {
      type: String,
      required: true,
      trim: true,
    },

    partner_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("master_partners_tbl", partnerSchema);