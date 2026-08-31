const mongoose = require("mongoose");

const InstructionSchema = new mongoose.Schema({
  m_instruction_id: { type: Number, }, 
  m_instruction_quiz: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'quizs' 
  }],

  m_instruction_key: { type: String, required: true },
  m_instruction_value: { type: String,  }
});

module.exports = mongoose.model("quiz_instructions", InstructionSchema);