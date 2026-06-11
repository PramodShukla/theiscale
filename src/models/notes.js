const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    notes_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes_categories",
      default: null,
    },

    notes_subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes_subcategory",
      default: null,
    },

    notes_name: {
      type: String,
      required: true,
      trim: true,
    },

    notes_keywords: {
      type: String,
      default: null,
    },

    notes_intro: {
      type: String,
      default: null,
    },

    notes_description: {
      type: String,
      default: null,
    },

    notes_image: {
      type: String,
      default: null,
    },

    notes_pdf: {
      type: String,
      default: null,
    },

    notes_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    notes_type: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },

    notes_price: {
      type: Number,
      default: 0,
    },

    notes_offer_price: {
      type: Number,
      default: 0,
    },

    no_of_ratings: {
      type: Number,
      default: 0,
    },

    no_of_students_enrolled: {
      type: Number,
      default: 0,
    },

    subjects: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "subject",
        },
      ],
      default: null,
    },

    training_highlights: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "course_training",
        },
      ],
      default: null,
    },

    notes_created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("notes", notesSchema);


//working