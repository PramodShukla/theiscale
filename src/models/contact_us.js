const mongoose = require("mongoose");

const contactQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      default: null,
    },

    message: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["new", "viewed", "solved"],
      default: "new",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("contact_query", contactQuerySchema);
