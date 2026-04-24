const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
  utype_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  utype_title: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("user_type_tbl", userTypeSchema);