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
      type: Number,
      enum: [1, 2], // free=1 , paid =2
      required: true,
      default: 1,
    },

    payment_status: {
      type: Number,
      enum: [0, 1, 2], //["2=pending", "1=success", "0=failed"],
      default: 2,
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

    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
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
      type: Number,
      enum: [1, 0],
      default: 1,
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
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    android_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    ios_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    // test_series_status: {
    //   type: String,
    //   enum: ["active", "inactive"],
    //   default: "inactive",
    // },

    // live_class_status: {
    //   type: String,
    //   enum: ["active", "inactive"],
    //   default: "inactive",
    // },

    test_series_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    live_class_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    certificate_status: {
      type: Number,
      enum: [0, 1, 2, 3], // ["0=not_requested", "1=pending", "2=approved", "3=declined"],
      default: 0,
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

    payment_mode: {
      type: String,
      default: null,
    },

    transaction_id: {
      type: String,
      default: null,
    },

    coupon_code: {
      type: String,
      default: null,
    },

    register_from: {
      type: Number,
      default: null, // later decide 1=web,2=android,etc
    },

    remarks: {
      type: Number,
      default: 1,
    },

    certificate_name: {
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
