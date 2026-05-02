const mongoose = require("mongoose");
const slugify = require("slugify");

const ecSchema = new mongoose.Schema({
  m_ec_title: {
    type: String,
    required: true,
    maxlength: 200,
  },

  m_ec_slug: {
    type: String,
    unique: true,
  },

  m_ec_for: {
    type: String,
    default: null,
  },

  m_ec_icon: {
    type: String,
    default: null,
  },

  m_ec_banner: {
    type: String,
    default: null,
  },

  m_ec_keyword: {
    type: String,
    default: null,
  },

  m_ec_desc: {
    type: String,
    default: null,
  },

  m_ec_order: {
    type: Number,
    default: 0,
  },

  m_ec_status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  m_ec_added_on: {
    type: Date,
    default: Date.now,
  },
});

// AUTO SLUG
ecSchema.pre("save", function (next) {
  if (!this.m_ec_slug) {
    this.m_ec_slug = slugify(this.m_ec_title, { lower: true });
  }
  // next();
});

module.exports = mongoose.model("event_category", ecSchema);