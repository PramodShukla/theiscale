const mongoose = require('mongoose');

const owcSchema = new mongoose.Schema({
  owc_id: {
    type: Number,
    required: true
  },
  owc_course_id: {
    type: Number,
    required: true
  },
  owc_offer_id: {
    type: String,
    required: true
  },
  last_modified: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('offer_wise_course', owcSchema);