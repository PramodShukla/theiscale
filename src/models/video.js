const mongoose = require("mongoose");

const brandVideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    video_file: {
      type: String,
      default: null,
      trim: true,
    },

    url: {
      type: String,
      default: null,
      trim: true,
    },

     public_id:{
      type: String,
      default: null,
      trim: true,
    },
     

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "brand_video",
  brandVideoSchema
);