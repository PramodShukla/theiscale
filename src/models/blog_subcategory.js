const mongoose = require('mongoose');

const bSubCategorySchema = new mongoose.Schema(
  {
    // b_subcate_id: {
    //   type: Number,
    //   unique: true,
    // },

    // simple integer field (no relation)
    b_cate_id: {
      type: Number,
      required: true,
    },

    b_subcate_name: {
      type: String,
      required: true,
      trim: true,
    },

    b_subcate_status: {
      type: Number,
      required: true,
      default: 1,
    },

    b_subcate_created: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog_subcategory", bSubCategorySchema);