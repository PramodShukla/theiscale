const mongoose = require('mongoose');

const mNewsSchema = new mongoose.Schema({
  m_news_id: {
    type: Number,
    required: true,
    unique: true
  },
  m_news_intro: { type: String, required: true },
  m_news_title: { type: String, required: true },
  m_news_slug: { type: String, required: true },
  m_news_image: { type: String, required: true },

  m_news_image1: { type: String, default: null },
  m_news_image2: { type: String, default: null },
  m_news_image3: { type: String, default: null },
  m_news_image4: { type: String, default: null },
  m_news_image5: { type: String, default: null },
  m_news_image6: { type: String, default: null },
  m_news_image7: { type: String, default: null },
  m_news_image8: { type: String, default: null },
  m_news_image9: { type: String, default: null },

  m_news_description: { type: String, default: null },
  m_news_description1: { type: String, default: null },
  m_news_description2: { type: String, default: null },
  m_news_description3: { type: String, default: null },
  m_news_description4: { type: String, default: null },
  m_news_description5: { type: String, default: null },
  m_news_description6: { type: String, default: null },
  m_news_description7: { type: String, default: null },
  m_news_description8: { type: String, default: null },
  m_news_description9: { type: String, default: null },

  m_news_added_on: { type: Date, required: true },
  m_news_order: { type: Number, required: true },
  m_news_status: { type: Number, required: true },
  m_news_addedby: { type: Number, required: true }
});

module.exports = mongoose.model('master_news_tbl', mNewsSchema);