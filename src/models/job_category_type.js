const mongoose = require('mongoose');

const categoryTypeSchema = new mongoose.Schema({
  // category_type_id: {
  //   type: Number,
  //   required: true
  // },
  category_type_title: {
    type: String,
    required: true
  },
  category_type_image: {
    type: String,
    required: true
  },
  category_type_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('job_category_type', categoryTypeSchema);