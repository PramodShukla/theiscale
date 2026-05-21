const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    m_country_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("countries", countrySchema);