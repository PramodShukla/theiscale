const mongoose = require("mongoose");

const mUserPermSchema = new mongoose.Schema({
  m_userperm_id: {
    type: Number,
    required: true,
    auto: true // MySQL AUTO_INCREMENT ko represent karta hai
  },

  m_userperm_userId: {
    type: Number,
    required: true
  },

  m_userperm_permId: {
    type: Number,
    required: true
  },

  m_userperm_module: {
    type: String,
    required: true,
    maxlength: 100
  },

  m_userperm_submodule: {
    type: String,
    required: true,
    maxlength: 100
  },

  m_userperm_list: {
    type: Number, // tinyint(1)
    required: true
  },

  m_userperm_add: {
    type: Number,
    required: true
  },

  m_userperm_edit: {
    type: Number,
    required: true
  },

  m_userperm_view: {
    type: Number,
    required: true
  },

  m_userperm_delete: {
    type: Number,
    required: true
  },

  m_userperm_export: {
    type: Number,
    required: true
  },

  m_userperm_filter: {
    type: Number,
    required: true
  },

  m_userperm_status: {
    type: Number,
    required: true,
    default: 1
  },

  m_userperm_added_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("user_permission", mUserPermSchema);