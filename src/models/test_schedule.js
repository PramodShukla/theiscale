const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  schedule_id: {
    type: Number,
    required: true,
    unique: true
  },
  schedule_testid: {
    type: Number,
    required: true
  },
  schedule_starttime: {
    type: String, // time stored as string (HH:MM:SS)
    required: true
  },
  schedule_endtime: {
    type: String, // time stored as string (HH:MM:SS)
    required: true
  },
  schedule_date: {
    type: Date,
    required: true
  },
  schedule_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('test_schedule', ScheduleSchema);