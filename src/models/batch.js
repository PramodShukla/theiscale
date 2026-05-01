const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  batch_name: {
    type: String,
    required: true,
    maxlength: 100
  },

  batch_instructor: {
    type: String,
    default: null,
    maxlength: 255
  },

  batch_description: {
    type: String,
    required: true
  },

  batch_course: {
    type: String,
    required: true,
    maxlength: 100
  },

  batch_date: {
    type: Date,
    required: true
  },

  start_time: {
    type: String,
    required: true,
    maxlength: 100
  },

  end_time: {
    type: String,
    required: true,
    maxlength: 100
  },

  strength: {
    type: String,
    required: true,
    maxlength: 100
  },

  topic: {
    type: String,
    required: true
  },

  m_batch_days: {
    type: String,
    required: true,
    maxlength: 255
  },

  m_batch_type: {
    type: Number,
    required: true,
    enum:[1, 2, 3] // 1: daily , 2: alternate, 3: weekends
  },

  m_batch_status: {
    type: Number,
    required: true,
    enum:[0,1,2,3] // 0: upcoming, 1: running, 2: completed, 3: cancelled  
  },

  m_batch_image: {
    type: String,
    required: true,
    maxlength: 255
  },

  order: {
    type: Number,
    default: null
  },

  m_batch_notice_desc: {
    type: String,
    required: true
  },

  m_batch_notice_link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("batch", batchSchema);