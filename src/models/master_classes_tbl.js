const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  // m_class_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_class_name: {
    type: String,
    required: true,
    maxlength: 250
  },

  m_class_category: {
    type: Number,
    required: true
  },

  m_class_course: {
    type: Number,
    required: true
  },

  m_class_link: {
    type: String,
    required: true
  },

  m_class_intro: {
    type: String,
    required: true
  },

  m_class_description: {
    type: String,
    required: true
  },

  m_class_status: {
    type: Number,
    required: true
  },

  m_class_added_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("master_classes_tbl", classSchema);