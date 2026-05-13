const mongoose = require("mongoose");

const TestCategorySchema = new mongoose.Schema(
  {
    test_categoryId: {
      type: Number,
      required: true,
      unique: true,
    },

    test_categoryName: {
      type: String,
      required: true,
      trim: true,
    },

    test_category_icon: {
      type: String,
      default: null,
    },

    test_category_banner: {
      type: String,
      default: null,
    },

    test_category_description: {
      type: String,
      default: null,
      trim:true,
    },

    test_category_status: {
      type: Number,
      enum: [0, 1], // 0 = inactive , 1 = active
      default: 1,
    },

    test_category_created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "test_categories",
  TestCategorySchema,
);