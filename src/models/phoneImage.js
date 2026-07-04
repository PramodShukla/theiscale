const mongoose = require("mongoose");

const phoneImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("phoneImage", phoneImageSchema);