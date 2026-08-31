const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    c_tool_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    c_tool_course_slug: {
      type: String,
      maxlength: 200,
      default: null,
    },

    c_tool_title: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },

    c_tool_img: {
      type: String,
      default: null,
    },

    c_tool_img_public_id: {
      type: String,
      default: null,
    },

    c_tool_description: {
      type: String,
      default: null,
      maxlength: 500,
      trim:true
    },

    c_tool_status: {
      type: Number,
      enum:[0,1],
      default: 1, // 1 = active, 0 = inactive
    },

    c_tool_created_by: {
      type: Number,
      default: 0,
    },

    c_tool_update_by: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("course_tools", toolSchema);
