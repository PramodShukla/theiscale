const mongoose = require("mongoose");

const userNavSchema = new mongoose.Schema({
  u_nav_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  un_branch_id: {
    type: Number,
    default: 0
  },

  un_nav_id: {
    type: Number,
    required: true
  },

  un_user_id: {
    type: Number,
    required: true
  },

  un_added_on: {
    type: Date,
    default: null
  },

  un_added_by: {
    type: Number,
    default: null
  },

  un_user_add: {
    type: Number,
    default: 0
  },

  un_user_edit: {
    type: Number,
    default: 0
  },

  un_user_view: {
    type: Number,
    default: 0
  },

  un_user_list: {
    type: Number,
    default: 0
  },

  un_user_delete: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("user_navigation_lms", userNavSchema);