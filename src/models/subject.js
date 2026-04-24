const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    default: null
  },
  type: {
    type: Number,
    required: true // 1=compulsory module, 2=domain module
  },
  is_writing: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('subject', ModuleSchema);