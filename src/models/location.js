const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  // city_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  location_state: {
    type: Number,
    required: true
  },

  location_name: {
    type: String,
    default: null
  },

  location_pincode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("location", citySchema);