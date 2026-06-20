const mongoose = require("mongoose");

const notesSubCategorySchema =
  new mongoose.Schema(
    {
      
      notes_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes_categories",
        required: true,
      },

      
      notes_subcategory_name: {
        type: String,
        required: true,
        trim: true,
      },

     
      notes_subcategory_icon: {
        type: String,
        default: null,
      },

      
      notes_subcategory_banner: {
        type: String,
        default: null,
      },

      

      notes_subcategory_description: {
        type: String,
        default: null,
        trim:true
      },

      

      notes_subcategory_status: {
        type: Number,
        enum: [0,1],
        default: 1,
      },

      

      notes_subcategory_created: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    },
  );

module.exports = mongoose.model(
  "notes_subcategory",
  notesSubCategorySchema,
);