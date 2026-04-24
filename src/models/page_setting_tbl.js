const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  page_id: {
    type: Number,
    required: true
  },
  page_title: {
    type: String,
    required: true
  },
  page_link: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  contact1: {
    type: String,
    required: false,
    default: null
  },
  contact2: {
    type: String,
    required: false,
    default: null
  },
  contact3: {
    type: String,
    required: false,
    default: null
  },
  page_description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  page_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('master_page_setting_tbl', pageSchema);