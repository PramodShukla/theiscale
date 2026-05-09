const mongoose = require("mongoose");

const eventEnrollmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      required: true,
    },

    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },

    enrolled_on: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// duplicate enrollment stop
eventEnrollmentSchema.index(
  { user_id: 1, event_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "event_enrollment",
  eventEnrollmentSchema
);