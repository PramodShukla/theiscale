const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    coupon_code: {
      type: String,
      default: null,
      trim: true,
    },

    coupon_title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    // course | testpackage | notes | webinar
    coupon_type: {
      type: Number,
      enum: [1,2,3,4],//["1=course", "2=testpackage", "3=notes", "4=webinar"],
      default: null,
    },

    // selected item id
    coupon_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    coupon_discount_type: {
      type: String,
      enum: ["flat", "percent"],
      default: null,
    },

    coupon_discount: {
      type: Number,
      default: 0,
    },

    coupon_min_amount: {
      type: Number,
      default: 0,
    },

    coupon_max_amount: {
      type: Number,
      default: 0,
    },

    amount: {
      type: Number,
      default: 0,
    },

    offer_amount: {
      type: Number,
      default: 0,
    },

    coupon_start_date: {
      type: Date,
      default: null,
    },

    coupon_end_date: {
      type: Date,
      default: null,
    },

    coupon_details: {
      type: String,
      default: null,
    },

    total_coupon: {
      type: Number,
      default: 0,
    },

    used_coupon: {
      type: Number,
      default: 0,
    },

    coupon_visible: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },

    coupon_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },

    coupon_added_on: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("coupon", couponSchema);

