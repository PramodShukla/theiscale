const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  // m_blog_id: {
  //   type: Number,
  //   required: true,
  //   auto: true // AUTO_INCREMENT
  // },

  m_blog_intro: {
    type: String,
    required: true,
    maxlength: 250
  },

  m_blog_title: {
    type: String,
    required: true
  },

  m_blog_image: {
    type: String,
    required: true
  },

  m_blog_description: {
    type: String,
    required: true
  },

  m_blog_added_on: {
    type: Date,
    required: true
  },

  m_blog_status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("blog1", blogSchema);