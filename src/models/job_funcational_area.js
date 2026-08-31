const mongoose = require('mongoose');

const functionalAreaSchema = new mongoose.Schema({
  // functional_area_id: {
  //   type: Number,
  //   required: true
  // },
  functional_area_name: {
    type: String,
    required: true
  },
  functional_area_status: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('job_functional_area', functionalAreaSchema);