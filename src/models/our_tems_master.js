const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    member_name: {
      type: String,
      required: true,
    },

    member_position: {
      type: String,
      required: true,
    },

    member_image: {
      type: String,
      required: true,
    },

    member_expertise: {
      type: String,
      default: null,
    },

    member_experience: {
      type: Number,
      default: null,
    },

    member_linkedin: {
      type: String,
      default: null,
    },

    member_bio: {
      type: String,
      default: null,
    },

    member_type: {
      type: Number,
      default: 0, // 1 => Team, 2 => Teacher
    },

    member_status: {
      type: Number,
      default: 0,
    },

    member_order: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("master_our_team_tbl", memberSchema);