const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    // c_tool_id: {
    //   type: Number,
    //   default: null,
    // },

    c_tool_course: {
      type: Number,
      required: true,
    },

    c_tool_course_slug: {
      type: String,
      required: true,
      maxlength: 200,
    },

    c_tool_title: {
      type: String,
      required: true,
      maxlength: 255,
    },

    c_tool_img: {
      type: String,
      required: true,
      maxlength: 50,
    },

    c_tool_description: {
      type: String,
      required: true,
      maxlength: 500,
    },

    c_tool_created_by: {
      type: Number,
      required: true,
    },

    c_tool_update_by: {
      type: Number,
      required: true,
    },

    c_tool_status: {
      type: Number,
      default: 1, // 1 = active
      required: true,
    },

    c_tool_created: {
      type: Date,
      required: true,
    },

    c_tool_updated: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("master_course_tools", toolSchema);