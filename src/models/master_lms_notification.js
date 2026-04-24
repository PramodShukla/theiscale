const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  // notification_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  notification_text: { type: String, required: true },
  notification_typefeild: { type: Number, required: true },
  notification_type: { type: Number, default: 1 , required: true }, 
  // 1=All User 2=Job 3=Course 4=Notes 5=Test Series 6=Paid User 7=Free User 8=Event 9=Certificate

  notification_desc: { type: String, required: true },
  nofification_date: { type: Date, required: true },
  notification_user: { type: Number, required: true }, // 1-user
  notification_userid: { type: Number, required: true },
  notification_banner: { type: String, required: true },

  last_modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('master_lms_notification', notificationSchema);