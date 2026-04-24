const mongoose = require("mongoose");

const InstructionSchema = new mongoose.Schema({
  m_instruction_id: { type: Number, required: true, unique: true }, // AUTO_INCREMENT handled separately
  m_instruction_quiz: { type: Number, required: true },

  m_instruction_key: { type: String, required: true },
  m_instruction_value: { type: String, required: true }
});

module.exports = mongoose.model("master_quiz_instructions", InstructionSchema);