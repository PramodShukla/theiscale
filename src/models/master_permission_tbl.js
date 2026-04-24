const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    // m_perm_id: {
    //   type: Number,
    //   required: true
    // },

    m_perm_name: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true
    },

    m_perm_module: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },

    m_perm_module_slug: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },

    m_perm_submodule_slug: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },

    m_perm_type: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true
    },

    m_perm_status: {
      type: Number,
      required: true,
      default: 1,
      //enum: [0, 1] // 1-active, 0-inactive (safe assumption)
    },

    m_perm_added_on: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("master_permission_tbl", PermissionSchema);