const mongoose = require('mongoose');

const eventCategorySchema = new mongoose.Schema({
  // e_category_id: {
  //   type: Number,
  //   required: true
  // },
  e_category_name: {
    type: String,
    required: true
  },
  e_category_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('educational_category', eventCategorySchema);