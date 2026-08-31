const mongoose = require('mongoose');

const navSchema = new mongoose.Schema({
  // nav_id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  nav_head: { type: Number, required: true },
  nav_title: { type: String, required: true },
  nav_link: { type: String, required: true },
  nav_icon: { type: String, default: null },
  nav_order: { type: Number, default: 0 },
  nav_description: { type: String, default: null },
  nav_status: { type: Number, default: 1 },
  nav_added_on: { type: Date, default: null }
});

module.exports = mongoose.model('navigation', navSchema);