const mongoose = require('mongoose');

const TransactionAppliedSchema = new mongoose.Schema({
  trans_applied_id: {
    type: Number,
    required: true,
    unique: true
  },
  trans_applied_rollno: {
    type: Number,
    required: true
  },
  trans_applied_rollprefix: {
    type: String,
    required: true
  },
  trans_applied_date: {
    type: Date,
    required: true
  },
  trans_applied_time: {
    type: String, // TIME stored as string (HH:MM:SS)
    required: true
  },
  trans_applied_candidate: {
    type: Number,
    required: true
  },
  trans_applied_test: {
    type: Number,
    required: true
  },
  trans_test_type: {
    type: Number,
    required: true // 1-GPET 2-DPET
  },
  trans_applied_shedule: {
    type: Number,
    required: true
  },
  trans_applied_coupon: {
    type: String,
    required: true
  },
  trans_applied_discount: {
    type: Number,
    required: true
  },
  trans_applied_gst: {
    type: Number,
    required: true
  },
  trans_appiled_subtotal: {
    type: Number,
    required: true
  },
  trans_applied_amount: {
    type: Number,
    required: true
  },
  trans_applied_transaction: {
    type: String,
    required: true
  },
  trans_applied_paystatus: {
    type: String,
    required: true
  },
  trans_applied_mode: {
    type: String,
    required: true
  },
  trans_card_genrated: {
    type: Number,
    required: true // 0-no 1-yes
  },
  trans_exam_mode: {
    type: Number,
    required: true // 1-Offline Exam 2-Online Exam
  },
  trans_gateway_status: {
    type: Number,
    required: true // 0-not done 1-done
  },
  trans_test_pattern: {
    type: Number,
    required: true // 1-Main 2-Mock Test
  }
});

module.exports = mongoose.model('trans_applied', TransactionAppliedSchema);