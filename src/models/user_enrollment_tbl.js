const mongoose = require("mongoose");

const eventEnrollmentSchema = new mongoose.Schema({
  u_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  u_enroll_type: {
    type: String,
    required: true,
    maxlength: 20
  },

  u_enroll_event: {
    type: String,
    required: true,
    maxlength: 100
  },

  u_enroll_user: {
    type: String,
    required: true,
    maxlength: 100
  },

  u_enroll_date: {
    type: Date,
    required: true
  },

  u_enroll_amount: {
    type: Number,
    required: true
  },

  u_enroll_payable: {
    type: Number,
    required: true
  },

  u_enroll_discount: {
    type: String,
    required: true,
    maxlength: 200
  },

  u_enroll_coupan: {
    type: String,
    required: true,
    maxlength: 200
  },

  u_enroll_pay_mode: {
    type: String,
    required: true,
    maxlength: 200
  },

  u_enroll_transaction_id: {
    type: String,
    required: true,
    maxlength: 200
  },

  u_enroll_remarks: {
    type: String,
    required: true
  },

  u_enroll_payment_status: {
    type: Number,
    required: true
  },

  u_enroll_status: {
    type: String,
    required: true,
    maxlength: 20
  },

  u_enroll_added_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("user_enrollment_tbl", eventEnrollmentSchema);