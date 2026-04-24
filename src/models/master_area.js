const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  // area_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  area_location: {
    type: Number,
    required: true
  },

  area_name: {
    type: String,
    required: true,
    maxlength: 255
  },

  area_status: {
    type: Number,
    required: true,
    enum: [0, 1] // 0=active, 1=inactive
  },

  last_modified: {
    type: Date,
    required: true,
    default: Date.now,
    set: Date.now()
  }
});

module.exports = mongoose.model("master_area", areaSchema);