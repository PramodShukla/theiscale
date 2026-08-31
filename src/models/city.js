const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    // OPTIONAL
    m_city_country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      default: null
    },

    // OPTIONAL
    m_city_state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      default: null
    },

    m_city_city: {
      type: String,
      required: true,
      trim: true
    },

    m_city_status: {
      type: Number,
      default: 1 // 1-active 0-inactive
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("city", citySchema);