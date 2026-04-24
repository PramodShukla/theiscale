const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_id: {
    type: Number,
    required: true
  },
  notification_text: {
    type: String,
    required: true
  },
  notification_desc: {
    type: String,
    required: true
  },
  nofification_date: {
    type: Date,
    required: true
  },
  notification_user: {
    type: Number,
    required: true
  },
  notification_userid: {
    type: Number,
    required: true
  },
  notification_banner: {
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

module.exports = mongoose.model('master_notification_tbl', notificationSchema);