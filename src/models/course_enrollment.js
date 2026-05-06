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
      default: 0, // percentage (0–100)
      min: 0,
      max: 100,
    },

    
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);


// to stop duplicate enrolments 
courseEnrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

module.exports = mongoose.model("course_enrollment", courseEnrollmentSchema);