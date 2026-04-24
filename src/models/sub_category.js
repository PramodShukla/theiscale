const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  s_category_id: {
    type: Number,
    required: true,
    unique: true
  },
  s_m_category_id: {
    type: Number,
    required: true,
    default: 0
  },
  s_category_name: {
    type: String,
    required: true
  },
  s_category_desc: {
    type: String,
    required: true
  },
  last_modified: {
    type: Date,
    required: true,
    default: Date.now
  },
  s_category_icon: {
    type: String,
    required: true
  },
  s_category_banner: {
    type: String,
    required: true
  },
  s_category_status: {
    type: Number,
    required: true // 0-active, 1-In-active
  }
});

module.exports = mongoose.model('sub_category', CategorySchema);