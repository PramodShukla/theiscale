const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  t_reg_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  t_reg_type: {
    type: Number,
    required: true
  },

  t_reg_user: {
    type: String,
    required: true
  },

  t_reg_course: {
    type: Number,
    required: true
  },

  t_reg_package: {
    type: Number,
    required: true
  },

  t_reg_notes: {
    type: Number,
    required: true
  },

  t_reg_webinar: {
    type: Number,
    default: null
  },

  t_reg_date: {
    type: Date,
    required: true
  },

  t_reg_amount: {
    type: Number,
    required: true
  },

  t_reg_payble: {
    type: Number,
    required: true
  },

  t_reg_coupon_id: {
    type: Number,
    required: true
  },

  t_reg_discount: {
    type: String,
    required: true,
    maxlength: 200
  },

  t_reg_coupon: {
    type: String,
    required: true,
    maxlength: 200
  },

  t_reg_pay_mode: {
    type: String,
    required: true,
    maxlength: 200
  },

  t_reg_transaction_id: {
    type: String,
    required: true,
    maxlength: 200
  },

  t_reg_remarks: {
    type: String,
    required: true
  },

  t_reg_status: {
    type: Number,
    required: true
  },

  t_reg_status_web: {
    type: Number,
    required: true
  },

  t_reg_status_android: {
    type: Number,
    required: true,
    default: 0
  },

  t_reg_status_live_class: {
    type: Number,
    required: true,
    default: 0
  },

  t_reg_status_test_series: {
    type: Number,
    required: true,
    default: 0
  },

  t_payment_status: {
    type: Number,
    required: true
  },

  t_reg_added_on: {
    type: Date,
    required: true
  },

  t_reg_register_from: {
    type: Number,
    required: true
  },

  batch_name: {
    type: String,
    required: true,
    maxlength: 100
  },

  t_reg_durration: {
    type: Number,
    required: true,
    default: 0
  },

  t_reg_web_durration: {
    type: Number,
    required: true
  },

  t_reg_request_certificate: {
    type: Number,
    default: 0
  },

  t_reg_certificate_name: {
    type: String,
    required: true,
    maxlength: 255
  },

  t_reg_certificate_status: {
    type: Number,
    default: 0
  },

  t_reg_certificate_number: {
    type: String,
    default: null,
    maxlength: 255
  },

  t_reg_certificate_pdf: {
    type: String,
    default: null,
    maxlength: 255
  },

  t_reg_certificate_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("user_courses", registrationSchema);