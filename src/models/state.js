const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    m_state_name: {
      type: String,
      required: true,
      trim: true
    },

    // OPTIONAL
    m_state_country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("state", stateSchema);