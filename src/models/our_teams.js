const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    member_name: {
      type: String,
      required: true,
      trim: true,
    },

    member_position: {
      type: String,
      default: null,
      trim: true,
    },

    member_image: {
      type: String,
      default: null,
    },

    member_expertise: {
      type: String,
      default: null,
      trim: true,
    },

    member_experience: {
      type: Number,
      default: null,
    },

    member_linkedin: {
      type: String,
      default: null,
      trim: true,
    },

    member_bio: {
      type: String,
      default: null,
      trim: true,
    },

    // 1 => Team Member
    // 2 => Teacher
    member_type: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },

    // 1 => Active
    // 0 => Inactive
    member_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },

    member_order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("our_teams", memberSchema);