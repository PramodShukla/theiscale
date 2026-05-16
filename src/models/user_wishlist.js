// const mongoose = require("mongoose");

// const wishlistSchema = new mongoose.Schema({
//   t_wishlist_id: {
//     type: Number,
//     required: true,
//     auto: true // AUTO_INCREMENT
//   },

//   t_wishlist_type: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_user: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_course: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_package: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_notes: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_webinar: {
//     type: Number,
//     default: 0
//   },

//   t_wishlist_event: {
//     type: Number,
//     required: true
//   },

//   t_wishlist_batches: {
//     type: Number,
//     default: 0
//   },

//   t_wishlist_added_on: {
//     type: Date,
//     default: Date.now,
//     set: (v) => v || Date.now()
//   }
// });

// module.exports = mongoose.model("user_wishlist", wishlistSchema);

const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "candidates",

      required: true,
    },

    wishlist_type: {
      type: String,

      enum: ["course", "package", "notes", "webinar", "event", "batch"],

      default: "course",
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
