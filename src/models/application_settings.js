const mongoose = require('mongoose');

const appConfigSchema = new mongoose.Schema(
  {
    m_app_key: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // index: true,
    },

    m_app_value: {
      type: String,
      trim: true,
    },

     setting_file: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("application_settings", appConfigSchema);

