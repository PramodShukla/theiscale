const mongoose = require("mongoose");

const testimonialRatingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      default: null,
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      default: null,
    },

    rating: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
    },

    review: {
      type: String,
      trim: true,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("testimonial_ratings", testimonialRatingSchema);
