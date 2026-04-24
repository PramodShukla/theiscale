const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  t_trans_user: { type: Number, required: true },
  t_trans_quiz: { type: Number, required: true },

  t_trans_points: { type: Number, required: true },
  t_trans_amount: { type: Number, required: true },

  t_trans_type: {
    type: Number,
    required: true // 1 = Credit, 2 = Debit
  },

  t_trans_date: { type: Date, required: true },

  t_trans_time: { type: String, required: true },

  t_trans_remark: { type: String, required: true }
});

module.exports = mongoose.model("master_wallet_transaction", transactionSchema);