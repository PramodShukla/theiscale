const mongoose = require("mongoose");

const notesCategorySchema = new mongoose.Schema(
  {
    nc_name: {
      type: String,
      required: true,
      trim: true,
    },

    nc_status: {
      type: Number,
      enum: [0,1],
      default: 1,
    },

    nc_keywords: {
      type: String,
      default: null,
      trim: true,
    },

    nc_order: {
      type: Number,
      default: 0,
    },

    nc_icon: {
      type: String,
      default: null,
    },

    nc_banner: {
      type: String,
      default: null,
    },

    nc_description: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "notes_categories",
  notesCategorySchema,
);