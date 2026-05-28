const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    m_banner_title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    m_banner_image: {
      type: String,
      default: null,
    },

    m_banner_status: {
      type: String,
      enum: ["pending", "running", "expired"],
      default: "running",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);

// using