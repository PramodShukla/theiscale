const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  user_id: {
    type: Number,
    required: true,
    index: true
  },

  session_id: {
    type: String,
    required: true,
    maxlength: 255
  },

  last_login: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("user_sessions", userSessionSchema);