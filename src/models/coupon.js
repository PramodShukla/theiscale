const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  // coupon_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  coupon_code: {
    type: String,
    required: true
  },

  coupon_title: {
    type: String,
    required: true
  },

  coupon_detail: {
    type: String,
    required: true
  },

  coupon_min_amount: {
    type: Number,
    required: true
  },

  coupon_max_amount: {
    type: Number,
    default: 0,
    required: true
  },

  coupon_discount_type: {
    type: Number,
    required: true,
    enum:[1,2] // 1=flat, 2=%
  },

  coupon_discount: {
    type: Number,
    required: true
  },

  coupon_start: {
    type: Date,
    required: true
  },

  coupon_end: {
    type: Date,
    required: true
  },

  m_coupon_test: {
    type: Number,
    required: true
  },

  m_coupon_city: {
    type: Number,
    required: true
  },

  coupon_uselimit: {
    type: Number,
    default: 0
  },

  coupon_unused: {
    type: Number,
    required: true
  },

  coupon_isvisible: {
    type: Number,
    required: true,
    enum: [1,2] // 1 = yes, 2 = no
  },

  coupon_status: {
    type: Number,
    default: 0,
    required: true,
    enum: [0,1] // 0 = inactive, 1 = active
  }
});

module.exports = mongoose.model("coupons", couponSchema);