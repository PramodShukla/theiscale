const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  m_news_title: {
    type: String,
    required: true,
    trim: true,
  },

  m_news_slug: {
    type: String,
    required: true,
    unique: true,
  },

  m_news_intro: {
    type: String,
    default: null,
  },

  m_news_image: {
    type: String,
  },
  m_news_description: {
    type: String,
    default: null,
  },

  m_news_status: {
    type: Number,
    enum :[0,1],
    default: 1, 
  },

  m_news_order: {
    type: Number,
    default: 0,
  },

  m_news_added_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("news&update", newsSchema);

//news&updateController
