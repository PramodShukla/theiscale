const mongoose = require("mongoose");

const masterBatchSchema = new mongoose.Schema(
  {
    // batch name
    batch_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // instructor id (optional)
    batch_instructor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructor",
      default: null,
    },

    // instructor name (optional)
    batch_instructor: {
      type: String,
      trim: true,
      maxlength: 255,
      default: "",
    },

    // course id
    batch_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      default: null,
    },

    // batch image
    m_batch_image: {
      type: String,
      default: "",
    },

    // batch start date
    batch_date: {
      type: Date,
      default: null,
    },

    // timing
    start_time: {
      type: String,
      default: "",
    },

    end_time: {
      type: String,
      default: "",
    },

    // student capacity
    strength: {
      type: Number,
      default: 0,
    },

    // notice
    m_batch_notice_desc: {
      type: String,
      default: "",
    },

    m_batch_notice_link: {
      type: String,
      default: "",
    },

    // display order
    order: {
      type: Number,
      default: 0,
    },

    // subject
    subject: {
      type: String,
      trim: true,
      default: "",
    },

    // selected days
    m_batch_days: [
      {
        type: String,
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      },
    ],

    // 0 upcoming
    // 1 running
    // 2 completed
    // 3 cancelled
    m_batch_status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("batch", masterBatchSchema);