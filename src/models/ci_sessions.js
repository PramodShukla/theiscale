const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true
  // },
  ip_address: {
    type: String,
    required: true
  },
  user_agent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  data: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('ci_sessions', sessionSchema);