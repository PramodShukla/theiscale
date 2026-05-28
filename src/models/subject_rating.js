const mongoose = require("mongoose");

const subjectRatingSchema = new mongoose.Schema(
  {
   

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      default: null,
    },


    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      default: null,
    },


    rating: {
      type: Number,
      default: null,

      min: 1,
      max: 5,

      validate: {
        validator: function (value) {
          return value % 0.5 === 0;
        },

        message:
          "Rating must be between 1 to 5 in steps of 0.5",
      },
    },

  

    review: {
      type: String,
      default: null,
      trim: true,
    },



    status: {
      type: String,

      enum: ["active", "inactive"],

      default: "active",
    },
  },

  {
    timestamps: true,

    versionKey: false,
  }
);

module.exports = mongoose.model(
  "subject_rating",
  subjectRatingSchema
);