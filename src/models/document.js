const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    // m_doc_id: {
    //   type: Number,
    //   default: null,
    // },

    m_doc_name: {
      type: String,
      required: true,
      maxlength: 255,
    },

    m_doc_url: {
      type: String,
      required: true,
    },

    m_doc_video: {
      type: String,
      required: true,
    },

    m_doc_added_on: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("document", docSchema);