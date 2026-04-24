const mongoose = require("mongoose");

const cashbackSchema = new mongoose.Schema({
  // cashback_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  cashback_title: {
    type: String,
    required: true
  },

  cashback_amount_type: {
    type: Number,
    required: true,
    enum:[1,2] // 1=percentage, 2=flat
  },

  cashback_amount: {
    type: Number,
    required: true
  },

  cashback_no_oforder: {
    type: Number,
    required: true
  },

  cashback_min_orderamount: {
    type: Number,
    required: true
  },

  cashback_startdate: {
    type: Date,
    required: true
  },

  cashback_endate: {
    type: Date,
    required: true
  },

  cashback_remark: {
    type: String,
    required: true
  },

  cashback_status: {
    type: Number,
    required: true
  },

  last_modified: {
    type: Date,
    required: true,
    default: Date.now
  },

  cashback_details: {
    type: String,
    required: true
  },

  cashback_terms: {
    type: String,
    required: true
  },

  cashback_eligibity: {
    type: String,
    required: true
  },

  cashback_offer_process: {
    type: String,
    required: true
  },

  cashback_duration: {
    type: String,
    required: true
  },

  cashback_reward: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("master_cashback", cashbackSchema);