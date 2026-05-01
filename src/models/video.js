const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  m_video_title: { type: String, required: true },
  m_video_thumb: { type: String, required: true },
  m_video_link: { type: String, required: true },
  m_video_duration: { type: String, required: true },
  m_video_description: { type: String, required: true },

  m_video_added_on: { type: Date, required: true },

  m_video_status: { type: Number, required: true }
});

module.exports = mongoose.model("video", videoSchema);