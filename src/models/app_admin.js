const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    kh_username: {
      type: String,
      // required: true,
      trim: true,
      unique: true,
      index: true,
    },

    kh_admin_name: {
      type: String,
      required: true,
      trim: true,
    },

    kh_password: {
      type: String,
      required: true,
    },

    kh_admin_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // unique: true,
      index: true,
    },

    kh_admin_phone: {
      type: Number,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },

    kh_role: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5],
      // 1 = admin, 2 = user, 3 = manager, 4 = operator, 5 = accounts
    },

    kh_pic: {
      type: String,
      required: true,
    },

    kh_status: {
      type: Number,
      default: 1,
      enum: [0,1],
    },
  },
  {
    timestamps: {
      createdAt: "kh_added_on",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

module.exports = mongoose.model("app_admin", userSchema);
