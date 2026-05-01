const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  // m_country_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_country_name: {
    type: String,
    required: true,
    maxlength: 200
  }
});

module.exports = mongoose.model("countries", countrySchema);