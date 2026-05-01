const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    // m_district_id: {
    //   type: Number,
    //   default: null,
    // },

    m_district_state: {
      type: Number,
      required: true, // state reference id
    },

    m_district_name: {
      type: String,
      required: true,
      maxlength: 255,
    },

    m_district_status: {
      type: Number,
      required: true, // active/inactive flag
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("district", districtSchema);