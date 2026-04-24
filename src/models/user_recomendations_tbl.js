const mongoose = require("mongoose");

const recommendSchema = new mongoose.Schema({
  recomend_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  recomend_user: {
    type: Number,
    required: true
  },

  recomend_user_email: {
    type: String,
    required: true,
    maxlength: 250
  },

  recomend_date: {
    type: Date,
    required: true
  },

  recomend_message: {
    type: String,
    required: true
  },

  recomend_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("user_recomendations_tbl", recommendSchema);