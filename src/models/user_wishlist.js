const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "candidates",

      required: true,
    },

    wishlist_type: {
      type: Number,

      enum: [1,2,3,4,5,6],//["1=course", "2=package", "3=notes", "4=webinar", "5=event", "6=batch"],

      default: 1,
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "course",

      default: null,
    },

    package_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "test_package",

      default: null,
    },

    notes_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "notes",

      default: null,
    },

    webinar_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "webinar",

      default: null,
    },


    event_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "event",

      default: null,
    },


    batch_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "batch",

      default: null,
    },


    added_on: {
      type: Date,

      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);



wishlistSchema.index(
  {
    user_id: 1,
    course_id: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      course_id: {
        $type: "objectId",
      },
    },
  },
);

wishlistSchema.index(
  {
    user_id: 1,
    package_id: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      package_id: {
        $type: "objectId",
      },
    },
  },
);

wishlistSchema.index(
  {
    user_id: 1,
    notes_id: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      notes_id: {
        $type: "objectId",
      },
    },
  },
);

module.exports = mongoose.model("user_wishlist", wishlistSchema);
