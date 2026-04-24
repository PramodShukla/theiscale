const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  m_wallet_user: { type: Number, required: true },
  m_wallet_quiz: { type: Number, required: true },

  m_quiz_points: { type: Number, required: true },
  m_wallet_amount: { type: Number, required: true },

  m_wallet_updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("master_wallet_tbl", walletSchema);