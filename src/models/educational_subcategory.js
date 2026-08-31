const mongoose = require('mongoose');

const eventSubCategorySchema = new mongoose.Schema({
  // e_subcate_id: {
  //   type: Number,
  //   required: true
  // },
  e_subcate_cateid: {
    type: Number,
    required: true
  },
  e_subcate_name: {
    type: String,
    required: true
  },
  e_subcate_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('educational_subcategory', eventSubCategorySchema);