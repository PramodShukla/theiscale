const mongoose = require('mongoose');

const nfFileSchema = new mongoose.Schema({
  nf_file_id: {
    type: Number,
    required: true
  },
  nf_file_noteid: {
    type: Number,
    required: true
  },
  nf_file_title: {
    type: String,
    required: true
  },
  nf_file_name: {
    type: String,
    required: true
  },
  nf_subject: {
    type: Number,
    required: true
  },
  nf_is_download: {
    type: Number,
    required: true
  },
  nf_order: {
    type: Number,
    required: true
  },
  nf_lastmodified: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('notes_file', nfFileSchema);