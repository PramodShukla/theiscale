const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuesBankSubjectSchema = new Schema(
  {
    quesbank_id: {
      type: Number,
      required: true,
      index: true,
    },

    subject_id: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

module.exports = mongoose.model('quesbank_subject', QuesBankSubjectSchema);