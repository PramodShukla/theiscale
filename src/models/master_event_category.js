const mongoose = require("mongoose");

const ecSchema = new mongoose.Schema(
  {
    // m_ec_id: {
    //   type: Number,
    //   default: null,
    // },

    m_ec_title: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_ec_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_ec_for: {
      type: String,  //Number kar sakte hai 
      required: true,
      maxlength: 10,
      // 1 = course, 2 = test, 3 = notes
    },

    m_ec_icon: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_ec_banner: {
      type: String,
      required: true,
      maxlength: 200,
    },

    m_ec_keyword: {
      type: String,
      required: true,
      maxlength: 100,
    },

    m_ec_desc: {
      type: String,
      required: true,
    },

    m_ec_order: {
      type: String,
      required: true,
      maxlength: 20,
    },

    m_ec_status: {
      type: String,
      required: true,
      maxlength: 10,
    },

    m_ec_added_on: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("master_event_category", ecSchema);