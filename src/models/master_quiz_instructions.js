const mongoose = require("mongoose");

const InstructionSchema = new mongoose.Schema({
  m_instruction_id: { type: Number, }, 
  m_instruction_quiz: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'master_quizs_tbl' 
  }],

  m_instruction_key: { type: String, required: true },
  m_instruction_value: { type: String,  }
});

module.exports = mongoose.model("master_quiz_instructions", InstructionSchema);