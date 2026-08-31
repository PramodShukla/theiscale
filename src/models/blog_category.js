const mongoose = require('mongoose');

const bCategorySchema = new mongoose.Schema(
  {
    // b_category_id: {
    //   type: Number,
    //   unique: true,
    // },

    b_category_name: {
      type: String,
      required: true,
      trim: true,
    },

    b_category_status: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 1,
    },

    b_category_created: {
      type: Date,
      required: true,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog_category", bCategorySchema);