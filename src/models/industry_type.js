const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  // industry_id: {
  //   type: Number,
  //   required: true
  // },
  industry_name: {
    type: String,
    required: true
  },
  industry_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('industry_type', industrySchema);