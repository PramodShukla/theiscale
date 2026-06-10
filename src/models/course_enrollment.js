const mongoose = require("mongoose");

const courseEnrollmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      required: true,
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    course_type: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },

    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    amount: {
      type: Number,
      default: 0,
    },

    original_amount: {
      type: Number,
      default: null,
    },

    offer_amount: {
      type: Number,
      default: null,
    },

    discount_amount: {
      type: Number,
      default: null,
    },

    payable_amount: {
      type: Number,
      default: null,
    },

    coupon_code: {
      type: String,
      default: null,
    },

    invoice_no: {
      type: String,
      default: null,
    },

    invoice_pdf: {
      type: String,
      default: null,
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

    enrolled_on: {
      type: Date,
      default: Date.now,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },

    batch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
      default: null,
    },

    batch_name: {
      type: String,
      default: null,
    },

    app_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    android_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    ios_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    test_series_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    live_class_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    certificate_status: {
      type: String,
      enum: ["not_requested", "pending", "approved", "declined"],
      default: "not_requested",
    },

    certificate_approved_at: {
      type: Date,
      default: null,
    },

    certificate_declined_reason: {
      type: String,
      default: null,
    },

    certificate_no: {
      type: String,
      default: null,
    },

    certificate_pdf: {
      type: String,
      default: null,
    },

    admin_note: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

courseEnrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

module.exports = mongoose.model("course_enrollment", courseEnrollmentSchema);
