const express = require("express");

const router = express.Router();

const {
  getCourseWishlistByUser,
  getSingleCourseWishlist,
  deleteCourseWishlist,

  getTestSeriesWishlistByUser,
  getSingleTestSeriesWishlist,
  deleteTestSeriesWishlist,

    getNotesWishlistByUser,
  getSingleNotesWishlist,
  deleteNotesWishlist
} = require("../controllers/appUserWishlistDetailsController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.get(
  "/course/all/:userId",
  authMiddleware,
  adminMiddleware,
  getCourseWishlistByUser
);

router.get(
  "/course/:id",
  authMiddleware,
  adminMiddleware,
  getSingleCourseWishlist
);

router.delete(
  "/course/:id",
  authMiddleware,
  adminMiddleware,
  deleteCourseWishlist
);

router.get(
  "/test/series/all/:userId",
  authMiddleware,
  adminMiddleware,
  getTestSeriesWishlistByUser
);

router.get(
  "/test/series/:id",
  authMiddleware,
  adminMiddleware,
  getSingleTestSeriesWishlist
);

router.delete(
  "/test/series/:id",
  authMiddleware,
  adminMiddleware,
  deleteTestSeriesWishlist
);


router.get(
  "/notes/all/:userId",
  authMiddleware,
  adminMiddleware,
  getNotesWishlistByUser
);

router.get(
  "/notes/:id",
  authMiddleware,
  adminMiddleware,
  getSingleNotesWishlist
);

router.delete(
  "/notes/:id",
  authMiddleware,
  adminMiddleware,
  deleteNotesWishlist
);

module.exports = router;