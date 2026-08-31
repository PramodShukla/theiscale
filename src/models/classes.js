const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    
    m_class_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    
    m_class_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },

   
    m_class_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      default: null,
    },

    
    m_class_link: {
      type: String,
      default: null,
      trim: true,
    },

  
    m_class_intro: {
      type: String,
      default: null,
      trim: true,
    },

    m_class_description: {
      type: String,
      default: null,
      trim: true,
    },

  
    // STATUS
    // 1 = Active
    // 0 = Inactive
   
    m_class_status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("classes", classSchema);