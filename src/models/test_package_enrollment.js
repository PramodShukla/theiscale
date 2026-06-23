const mongoose = require("mongoose");

const testPackageEnrollmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      required: true,
    },

    test_package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test_package",
      required: true,
    },

    package_type: {
      type: Number,
      enum: [1, 2], // 1=free , 2= paid
      default: 1,
    },

    payment_status: {
      type: Number,
      enum: [0, 1, 2], //["2=pending", "1=success", "0=failed"],
      default: 2,
    },

    payment_mode: {
      type: String,
      default: null,
    },

    transaction_id: {
      type: String,
      default: null,
    },

    original_amount: {
      type: Number,
      default: 0,
    },

    offer_amount: {
      type: Number,
      default: 0,
    },

    discount_amount: {
      type: Number,
      default: 0,
    },

    payable_amount: {
      type: Number,
      default: 0,
    },

    coupon_code: {
      type: String,
      default: null,
    },

    access_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },

    access_type: {
      type: String,
      enum: ["lifetime", "limited"],
      default: "lifetime",
    },

    expiry_date: {
      type: Date,
      default: null,
    },

    remark: {
      type: String,
      default: null,
    },

    enrolled_on: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "test_package_enrollment",
  testPackageEnrollmentSchema,
);
       