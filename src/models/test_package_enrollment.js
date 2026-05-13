const mongoose = require("mongoose");

const testPackageEnrollmentSchema =
  new mongoose.Schema(
    {
      // =========================
      // USER
      // =========================
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates",
        required: true,
      },

      // =========================
      // TEST PACKAGE
      // =========================
      test_package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test_package",
        required: true,
      },

      // =========================
      // PAYMENT DETAILS
      // =========================
      package_type: {
        type: String,
        enum: ["free", "paid"],
        default: "free",
      },

      payment_status: {
        type: String,
        enum: [
          "pending",
          "success",
          "failed",
        ],
        default: "pending",
      },

      payment_mode: {
        type: String,
        default: null,
      },

      transaction_id: {
        type: String,
        default: null,
      },

      // =========================
      // PRICE DETAILS
      // =========================
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

      // =========================
      // ACCESS
      // =========================
      access_status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
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

      // =========================
      // OTHER
      // =========================
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