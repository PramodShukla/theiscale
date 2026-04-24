const mongoose = require("mongoose");

const webinarRegistrationSchema = new mongoose.Schema({
  w_reg_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  w_reg_wid: {
    type: Number,
    required: true
  },

  w_reg_user: {
    type: Number,
    required: true
  },

  w_reg_date: {
    type: Date,
    required: true
  },

  w_reg_amount: {
    type: Number,
    required: true
  },

  w_reg_payble: {
    type: Number,
    required: true
  },

  w_reg_discount: {
    type: String,
    required: true,
    maxlength: 200
  },

  w_reg_coupon: {
    type: String,
    required: true,
    maxlength: 200
  },

  w_reg_pay_mode: {
    type: String,
    required: true,
    maxlength: 200
  },

  w_reg_transaction_id: {
    type: String,
    required: true,
    maxlength: 200
  },

  w_reg_remarks: {
    type: String,
    required: true
  },

  w_reg_status: {
    type: Number,
    required: true
  },

  w_payment_status: {
    type: Number,
    required: true
  },

  w_reg_added_on: {
    type: Date,
    required: true,
    default: Date.now
  },

  w_reg_register_from: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("user_webinar_tbl", webinarRegistrationSchema);