const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  // city_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  city_state: {
    type: Number,
    required: true
  },

  city_name: {
    type: String,
    default: null
  },

  city_pincode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("cities", citySchema);