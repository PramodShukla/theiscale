const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  zid: {
    type: String,
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  },
  batch_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('assign_zoom', Schema);