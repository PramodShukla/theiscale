const mongoose = require('mongoose');

const eventSpecSchema = new mongoose.Schema({
  // e_spec_id: {
  //   type: Number,
  //   required: true
  // },
  e_spec_subcate: {
    type: Number,
    required: true
  },
  e_spec_title: {
    type: String,
    required: true
  },
  e_spec_status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('educational_specialization', eventSpecSchema);