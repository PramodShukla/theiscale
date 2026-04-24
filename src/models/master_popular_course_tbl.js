const mongoose = require("mongoose");

const MpCourseSchema = new mongoose.Schema(
  {
    // mp_course_id: {
    //   type: Number,
    //   required: true
    // },

    mp_course_title: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    mp_course_price: {
      type: Number,
      required: true,
      min: 0
    },

    mp_course_offer_price: {
      type: Number,
      required: true,
      min: 0
    },

    mp_course_image: {
      type: String,
      required: true
    },

    mp_course_status: {
      type: Number,
      required: true,
      //enum: [0, 1], // 0-inactive, 1-active (assumption based on common pattern)
      // default: 1
    },

    mp_course_order: {
      type: Number,
      required: true,
      // default: 0
    },

    mp_course_added_on: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("master_popular_course_tbl", MpCourseSchema);