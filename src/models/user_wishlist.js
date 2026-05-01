const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  t_wishlist_id: {
    type: Number,
    required: true,
    auto: true // AUTO_INCREMENT
  },

  t_wishlist_type: {
    type: Number,
    required: true
  },

  t_wishlist_user: {
    type: Number,
    required: true
  },

  t_wishlist_course: {
    type: Number,
    required: true
  },

  t_wishlist_package: {
    type: Number,
    required: true
  },

  t_wishlist_notes: {
    type: Number,
    required: true
  },

  t_wishlist_webinar: {
    type: Number,
    default: 0
  },

  t_wishlist_event: {
    type: Number,
    required: true
  },

  t_wishlist_batches: {
    type: Number,
    default: 0
  },

  t_wishlist_added_on: {
    type: Date,
    default: Date.now,
    set: (v) => v || Date.now()
  }
});

module.exports = mongoose.model("user_wishlist", wishlistSchema);