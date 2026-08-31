const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },

    user_designation: {
      type: String,
      default: null,
      trim: true,
    },

    user_image: {
      type: String,
      default: null,
    },

    user_review: {
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

module.exports = mongoose.model("user_reviews", userReviewSchema);


// using 