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
    required: true
  },

  coupon_discount_type: {
    type: Number,
    required: true,
    enum:[0,1] // 0 = flat, 1 = %
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

  m_coupon_course: {
    type: Number,
    required: true
  },

  m_coupon_test: {
    type: Number,
    required: true
  },

  m_coupon_notes: {
    type: Number,
    required: true
  },

  m_coupon_webinar: {
    type: Number,
    required: true,
    default: 0
  },

  m_coupon_type: {
    type: Number,
    required: true,
    enum: [1,2,3] // 1=course, 2=test, 3=notes 
  },

  m_coupon_city: {
    type: Number,
    required: true
  },

  coupon_uselimit: {
    type: Number,
    default: 0
  },

  coupon_isvisible: {
    type: String,
    default: null
  },

  coupon_unused: {
    type: String,
    default: null
  },

  coupon_status: {
    type: Number,
    default: 0,
    enum: [0,1] // 0 = inactive, 1 = active
  }
});

module.exports = mongoose.model("master_coupons_lms tbl", couponSchema);