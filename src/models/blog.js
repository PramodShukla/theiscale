const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    // blog_id: {
    //   type: Number,
    //   unique: true,
    // },

    blog_category: {
      type: Number,
      required: true,
    },

    blog_subcategory: {
      type: Number,
      required: true,
    },

    blog_title: {
      type: String,
      required: true,
      trim: true,
    },

    blog_author: {
      type: String,
      required: true,
    },

    blog_author_image: {
      type: String,
      required: true,
    },

    blog_author_desc: {
      type: String,
      required: true,
    },

    blog_image: {
      type: String,
      required: true,
    },

    blog_desc: {
      type: String,
      required: true,
    },

    blog_shortdesc: {
      type: String,
      required: true,
    },

    blog_keyword: {
      type: String,
      required: true,
    },

    blog_date: {
      type: Date,
      required: true,
    },

    blog_time: {
      type: String, // time is usually stored as string in MongoDB
      required: true,
    },

    blog_file: {
      type: String,
      required: true,
    },

    blog_views: {
      type: Number,
      default: 0,
      required: true,
    },

    blog_like: {
      type: Number,
      default: 0,
      required: true,
    },

    blog_comment: {
      type: Number,
      default: 0,
    },

    blog_istranding: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },

    blog_islatest: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },

    blog_squence: {
      type: Number,
      default: 0,
      required: true,
    },

    blog_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog", blogSchema);