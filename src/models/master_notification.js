const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  // notification_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  notification_date: { type: Date, required: true },
  notification_time: { type: String, required: true },
  notification_title: { type: String, required: true },
  notification_link: { type: String, required: true }, // Link where notification redirect
  notification_for: { type: Number, required: true }, // 1-admin 2-company 3-user
  notification_userid: { type: Number, required: true },
  notification_icon: { type: String, required: true },
  notification_color: { type: String, required: true },
  notification_view: { type: Number, required: true }, // 0-No View, 1-Viewed
  notification_remark: { type: String, default: null }
});

module.exports = mongoose.model('master_notification', notificationSchema);