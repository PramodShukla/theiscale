const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  ms_story_id: {
    type: Number,
    required: true,
    unique: true
  },
  ms_candidate_name: {
    type: String,
    required: true
  },
  ms_candidate_designation: {
    type: String,
    required: true
  },
  ms_candidate_image: {
    type: String,
    required: true
  },
  ms_candidate_linkedin: {
    type: String,
    required: true
  },
  ms_candidate_feedback: {
    type: String,
    required: true
  },
  ms_place_company: {
    type: String,
    required: true
  },
  ms_package: {
    type: String,
    required: true
  },
  ms_video_url: {
    type: String,
    required: true
  },
  ms_order: {
    type: Number,
    required: true
  },
  ms_status: {
    type: Number,
    required: true
  },
  ms_added_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('master_success_story_interviewer_tbl', StorySchema);